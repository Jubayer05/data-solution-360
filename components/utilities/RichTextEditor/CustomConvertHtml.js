import { convertToHTML } from 'draft-convert';

export const customConvertToHTML = (contentState) => {
  return convertToHTML({
    blockToHTML: (block) => {
      const alignment = block.data['text-align'];
      let alignmentClass = 'text-left'; // Default to left alignment
      if (alignment) {
        alignmentClass = `text-${alignment}`;
      }

      return {
        start: `<div class="${alignmentClass}">`,
        end: '</div>',
      };
    },
    entityToHTML: (entity, originalText) => {
      if (entity.type === 'LINK') {
        return `<a href="${entity.data.url}" target="_blank">${originalText}</a>`;
      }
      return originalText;
    },
  })(contentState);
};
