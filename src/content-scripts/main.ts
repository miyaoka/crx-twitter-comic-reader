// modal
const modalSelector = "[aria-modal]";
// timeline
const timelineSelector = "div[style^=transform]";
// navLeft
const navLeftSelector = "[data-testid=Carousel-NavLeft]";
// navRight
const navRightSelector = "[data-testid=Carousel-NavRight]";
// photo
const photoSelector = "[data-testid=tweetPhoto]";
// tweetButton
// const tweetButtonSelector = "[data-testid=tweetButton]";
//
const photoPageRegex = new RegExp("^/[^/]+/status/\\d+/photo");

const moveToAdjacentPhoto = ({
  event,
  modal,
  after,
  skip,
}: {
  event: KeyboardEvent;
  modal: Element;
  after: boolean;
  skip: boolean;
}) => {
  if (!skip) {
    if (document.querySelector(after ? navRightSelector : navLeftSelector))
      return;
  }
  event.stopImmediatePropagation();
  const timeline = Array.from(modal.querySelectorAll(timelineSelector));
  const currentArticleIndex = timeline.findIndex((line) => {
    const article = line.querySelector("article");
    if (!article) return false;

    // Only the current article has no keyboard focus.
    return article.tabIndex === -1;
  });
  if (currentArticleIndex < 0) {
    // something error
    console.log("cant find current article index.");
    return;
  }

  if (after) {
    timeline.slice(currentArticleIndex + 1).some((line) => {
      const photos = line.querySelectorAll<HTMLDivElement>(photoSelector);
      if (photos.length > 0) {
        photos[0].click();
        return true;
      }
      return false;
    });
  } else {
    timeline
      .slice(0, currentArticleIndex)
      .reverse()
      .some((line) => {
        const photos = line.querySelectorAll<HTMLDivElement>(photoSelector);
        if (photos.length > 0) {
          const target = skip ? photos[0] : photos[photos.length - 1];
          target.click();
          return true;
        }
        return false;
      });
  }
};

const onKeydown = (event: KeyboardEvent) => {
  if (!photoPageRegex.test(location.pathname)) return;
  const modal = document.querySelector(modalSelector);
  if (!modal) return;

  const dir = event.key.match(/^Arrow(?<dir>Up|Down|Left|Right)$/)?.groups?.dir;
  if (!dir) return;

  moveToAdjacentPhoto({
    event,
    modal,
    after: /Right|Down/.test(dir),
    skip: /Up|Down/.test(dir),
  });
};

document.addEventListener("keydown", onKeydown);
