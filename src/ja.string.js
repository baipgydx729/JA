/**
 * Created by along on 16/4/25.
 */

(function () {
    'use strict';
    var _string = {};
    _string.escape = function (html) {
        var codeSpan = /(^|[^\\])(`+)([^\r]*?[^`])\2(?!`)/gm;
        var codeBlock = /(?:\n\n|^)((?:(?:[ ]{4}|\t).*\n+)+)(\n*[ ]{0,3}[^ \t\n]|(?=~0))/g;
        var spans = [];
        var blocks = [];
        var text = String(html).replace(/\r\n/g, '\n')
            .replace('/\r/g', '\n');

        text = '\n\n' + text + '\n\n';

        text = text.replace(codeSpan, function (code) {
            spans.push(code);
            return '`span`';
        });

        text += '~0';

        return text.replace(codeBlock, function (whole, code, nextChar) {
            blocks.push(code);
            return '\n\tblock' + nextChar;
        })
            .replace(/&(?!\w+;)/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/`span`/g, function () {
                return spans.shift();
            })
            .replace(/\n\tblock/g, function () {
                return blocks.shift();
            })
            .replace(/~0$/, '')
            .replace(/^\n\n/, '')
            .replace(/\n\n$/, '');
    };

    JA.string = _string;
})();

