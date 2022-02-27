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
const tweetButtonSelector = "[data-testid=tweetButton]";
//
const photoPageRegex = new RegExp("^/[^/]+/status/\\d+/photo");

const moveToNextPhoto = (arg: { modal: Element; after: boolean }) => {
  const { modal, after } = arg;
  const timeline = Array.from(modal.querySelectorAll(timelineSelector));
  const index = timeline.findIndex((line) => {
    return line.querySelector(tweetButtonSelector);
  });
  if (index < 0) {
    // something error
    return;
  }

  if (after) {
    timeline.slice(index + 1).some((line) => {
      const photos = line.querySelectorAll<HTMLDivElement>(photoSelector);
      if (photos.length > 0) {
        photos[0].click();
        return true;
      }
      return false;
    });
  } else {
    timeline
      .slice(0, index)
      .reverse()
      .some((line) => {
        const photos = line.querySelectorAll<HTMLDivElement>(photoSelector);
        if (photos.length > 0) {
          photos[photos.length - 1].click();
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

  switch (event.key) {
    case "ArrowLeft": {
      if (!document.querySelector(navLeftSelector)) {
        event.preventDefault();
        event.stopPropagation();
        event.stopImmediatePropagation();
        moveToNextPhoto({
          modal,
          after: false,
        });
      }
      return;
    }
    case "ArrowRight": {
      if (!document.querySelector(navRightSelector)) {
        event.preventDefault();
        event.stopPropagation();
        event.stopImmediatePropagation();
        moveToNextPhoto({
          modal,
          after: true,
        });
      }
      return;
    }
  }
};

document.addEventListener("keydown", onKeydown);
