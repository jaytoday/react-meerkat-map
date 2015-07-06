'use strict';

import colors from 'material-ui/lib/styles/colors';
import colorManipulator from 'material-ui/lib/utils/color-manipulator';
import spacing from 'material-ui/lib/styles/spacing';

export default {
  spacing,
  contentFontFamily: 'Roboto, sans-serif',
  getPalette() {
    return {
      textColor: colors.red200,
      canvasColor: colors.red50,
      borderColor: colors.red100,
    };
  },
  getComponentThemes(palette) {
    let obj = {
      avatar: {
        borderColor: '#FFF0F1',
      },
      cover: {
        backgroundColor: '#DDD',
        labelWatchers: {
          backgroundColor: 'rgba(51, 122, 183, 0.80)',
        },
        labelLocation: {
          backgroundColor: 'rgba(0, 0, 0, 0.40)',
        },
      },
      coverLabel: {
        color: '#FFF',
      },
      flatButton: {
        color: palette.canvasColor,
        hoverColor: colorManipulator.fade(palette.textColor, 0.2),
        textColor: palette.textColor,
      },
      githubButton: {
        color: 'rgba(0, 0, 0, .40)',
        hoverColor: colors.fullBlack,
        rippleColor: colorManipulator.fade(palette.textColor, 0.8),
      },
      markerPopup: {
        color: '#999797',
      },
      toolbar: {
        backgroundColor: palette.canvasColor,
        borderColor: palette.borderColor,
        separatorColor: palette.borderColor,
        textColor: palette.textColor,
      },
      title: {
        color: palette.textColor,
        hoverColor: colors.red300,
      },
      list: {
        color: palette.textColor,
        backgroundColor: palette.canvasColor,
        borderColor: palette.borderColor,
      },
      listDivider: {
        backgroundColor: colorManipulator.fade(palette.borderColor, 0.3),
      },
    };

    return obj;
  },
};
