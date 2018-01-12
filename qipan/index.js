$(function () {
    let qipan = $('.qipan'),
        blank = {};
    let flag = true,
        black = {},
        white = {},
        ai = true,
        result = $('.result');
    for (let i = 1; i < 12; i++) {
        $('<i>').appendTo(qipan);
        $('<b>').appendTo(qipan);
        for (let j = 1; j < 12; j++) {
            blank[i + '_' + j] = true;
            $('<div>').addClass('qizi').attr('id', i + '_' + j).appendTo(qipan).data('pos', {x: i, y: j})
            ;
        }
    }
    for (let k = 0; k < 5; k++) {
        $('<span>').appendTo(qipan).addClass('zi');
    };
    $('.renren').on('click',function(){
        ai = false;
    });
    $('.renji').on('click',function(){
        ai = true;
    });
    qipan.on('click', '.qizi', function () {
        if ($(this).hasClass('black') || $(this).is('.white')) {
            return;
        }
        let data = $(this).data('pos');
        if (flag) {
            $(this).addClass('black');
            black[data.x + "_" + data.y] = true;
            delete blank[data.x + '_' + data.y];
            if (isSuccess(data, black) >= 5) {
                result.addClass('block').html('黑棋赢啦！');
                qipan.off();
            }
            if (ai) {
                let pos = position();
                $('#' + pos.x + "_" + pos.y).addClass('white');
                white[pos.x + "_" + pos.y] = true;
                delete blank[pos.x + '_' + pos.y];
                if (isSuccess(pos, white) >= 5) {
                    result.addClass('block').html('白棋赢啦！')
                    qipan.off();
                }
                return;
            }
        } else {
            $(this).addClass('white');
            white[data.x + "_" + data.y] = true;
            if (isSuccess(data, white) >= 5) {
                console.log('白棋赢');
                qipan.off();
            }
        }
        flag = !flag;
    });

    function position() {
        let score1 = 0, score2 = 0, pos1 = null, pos2 = null;
        for (let i in blank) {
            let obj = {x: i.split('_')[0], y: i.split('_')[1]};
            if (isSuccess(obj, black) > score1) {
                score1 = isSuccess(obj, black);
                pos1 = obj;
            }
            if (isSuccess(obj, white) > score2) {
                score2 = isSuccess(obj, white);
                pos2 = obj;
            }
        }
        return score1 > score2 ? pos1 : pos2;
    }

    function isSuccess(pos, obj) {
        // {x:7,y:7} black
        let hen = 1, shu = 1, yx = 1, zx = 1,
            x = pos.x, y = pos.y;
        while (obj[x + "_" + (++y)]) {
            hen++;
        }
        y = pos.y;
        while (obj[x + "_" + (--y)]) {
            hen++;
        }

        x = pos.x , y = pos.y;
        while (obj[(++x) + "_" + y]) {

            shu++;
        }
        x = pos.x;
        while (obj[(--x) + "_" + y]) {
            shu++;
        }

        x = pos.x , y = pos.y;

        while (obj[(++x) + "_" + (++y)]) {
            zx++;
        }
        x = pos.x , y = pos.y;
        while (obj[(--x) + "_" + (--y)]) {
            zx++;
        }

        x = pos.x , y = pos.y;

        while (obj[(--x) + "_" + (++y)]) {
            yx++;
        }
        x = pos.x , y = pos.y;
        while (obj[(++x) + "_" + (--y)]) {
            yx++;
        }

        return Math.max(hen, shu, zx, yx);
    }
});