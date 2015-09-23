var game = game || (game = {});

(function (d) {
    var f = function (d) {
        function c(b, a) {
            d.call(this, b);
            this.CLASS_NAME = "CustomEvent";
            this.data = a
        }
        __extends(c, d);
        c.prototype.toString = function () {
            console.log(this.CLASS_NAME)
        };
        return c
    }(egret.Event);
    d.CustomEvent = f;
    f.prototype.__class__ = "game.CustomEvent"
})(game);

var GameEvent = function (d) {
    function f(e, c, b) {
        void 0 === c && (c = !1);
        void 0 === b && (b = !1);
        d.call(this, e, c, b)
    }
    __extends(f, d);
    f.POPUP_BTN_CLICK = "POPUP_BTN_CLICK";
    f.SHOW_HIDE_TIPS = "SHOW_HIDE_TIPS";
    f.GAME_START = "GAME_START";
    return f
}(egret.Event);
GameEvent.prototype.__class__ = "GameEvent";

var GameVO = function () {
    function d() {}
    d.GAME_SCORE = 0;
    return d
}();
GameVO.prototype.__class__ = "GameVO";

(function (d) {
    var f = function (e) {
        function c() {
            e.call(this);
            this.CLASS_NAME = "CustomEventDispatcher"
        }
        __extends(c, e);
        var b = c.prototype;
        c.getInstance = function () {
            void 0 == c._instance && (c._instance = new c);
            return c._instance
        };
        b.dispatch = function (a, b) {
            this.dispatchEvent(new d.CustomEvent(a, b))
        };
        b.toString = function () {
            console.log(this.CLASS_NAME)
        };
        return c
    }(egret.EventDispatcher);
    d.CustomEventDispatcher = f;
    f.prototype.__class__ = "game.CustomEventDispatcher"
})(game);


(function (d) {
    var f = function () {
        function d() {}
        d.hitTest = function (c, b) {
            var a = c.getBounds(),
                d = b.getBounds();
            a.x = c.x;
            a.y = c.y;
            d.x = b.x;
            d.y = b.y;
            return a.intersects(d)
        };
        d.getEmptyTouchSprite = function (c, b) {
            var a = new egret.Sprite;
            a.graphics.beginFill(16777215, 0);
            a.graphics.drawRect(0, 0, c, b);
            a.graphics.endFill();
            a.width = c;
            a.height = b;
            a.touchEnabled = !0;
            return a
        };
        d.getColorSprite = function (c, b, a, d) {
            void 0 === a && (a = 0);
            void 0 === d && (d = 1);
            var e = new egret.Sprite;
            e.graphics.beginFill(a, d);
            e.graphics.drawRect(0, 0, c, b);
            e.graphics.endFill();
            e.width = c;
            e.height = b;
            return e
        };
        return d
    }();
    d.DisplayObjectUtil = f;
    f.prototype.__class__ = "game.DisplayObjectUtil"
})(game);

(function (d) {
    var f = function () {
        function d() {}
        d.createBitmapByName = function (c) {
            var b = new egret.Bitmap;
            c = RES.getRes(c);
            b.texture = c;
            return b
        };
        d.getTextureByName = function (c) {
            return RES.getRes(c)
        };
        d.destroyRes = function (c) {
            return RES.destroyRes(c)
        };
        d.getTextureFromSheetByName = function (c, b) {
            return RES.getRes(c).getTexture(b)
        };
        return d
    }();
    d.ResUtil = f;
    f.prototype.__class__ = "game.ResUtil"
})(game);
