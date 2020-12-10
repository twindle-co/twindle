// @ts-check

/**
 * @param {any} node
 * @param {number} selectedListIndex
 */
export function rovingTabindex(node, selectedListIndex) {
  /** @type {HTMLDivElement[]} */
  const listItemEls = [...node.querySelectorAll('ul > div.container')];

  /** @param {KeyboardEvent} e */
  function handleKeyboard(e) {
    console.log(e);
    const responses = {
      ArrowUp: -1,
      ArrowDown: +1,
    };

    selectedListIndex = -1;

    if (e.key in responses) {
      const num = responses[e.key];

      selectedListIndex = Math.min(listItemEls.length - 1, Math.max(0, selectedListIndex + num));

      // Emit the event to change the current focusable element
      node.dispatchEvent(
        new CustomEvent('focusChange', {
          detail: selectedListIndex,
        })
      );

      listItemEls[selectedListIndex].focus();
    }
  }

  for (let listItemEl of listItemEls) {
    listItemEl.addEventListener('keydown', handleKeyboard);
  }

  return {
    destroy() {
      listItemEls.forEach((el) => el.removeEventListener('mousedown', handleKeyboard));
    },
  };
}
