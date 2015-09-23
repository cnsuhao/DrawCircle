var guodong;
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
    f.prototype.__class__ = "guodong.CustomEvent"
})(guodong || (guodong = {}));
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
    f.prototype.__class__ = "guodong.CustomEventDispatcher"
})(guodong || (guodong = {}));
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
    f.prototype.__class__ = "guodong.DisplayObjectUtil"
})(guodong || (guodong = {}));
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
    f.prototype.__class__ = "guodong.ResUtil"
})(guodong || (guodong = {}));
var DrawLayer = function (d) {
    function f() {
        d.call(this);
        this._touchPointArr = [];
        this.m_clickDrag = [];
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
        this.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMoved, this);
        this.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnded, this)
    }
    __extends(f, d);
    var e = f.prototype;
    e.onAddToStage = function (c) {
        this._myShape = new egret.Shape;
        this.addChild(this._myShape);
        this.touchChildren = !1;
        this.touchEnabled = !0;
        c = guodong.DisplayObjectUtil.getEmptyTouchSprite(640, 1200);
        c.x = -320;
        c.y = -600;
        this.addChild(c)
    };
    e.addTouchPoint = function (c, b, a) {
        void 0 === a && (a = !1);
        var d = new egret.Point(Math.round(c), Math.round(b));
        if (1 < this._touchPointArr.length) {
            c = this._touchPointArr[this._touchPointArr.length - 1];
            b = d.x - c.x;
            var d = d.y - c.y,
                e = Math.sqrt(b * b + d * d);
            if (5 < e) for (var e = Math.round(e / 5), f = 0; f < e; f++) this._touchPointArr.push(new egret.Point(b / e * (f + 1) + c.x, d / e * (f + 1) + c.y)),
                this.m_clickDrag.push(a)
        } else this._touchPointArr.push(d),
            this.m_clickDrag.push(a)
    };
    e.redraw = function () {
        this._myShape.graphics.clear();
        this._myShape.graphics.lineStyle(3, 15382354, 1, !0, "", "", "round");
        for (var c = 0; c < this._touchPointArr.length; c++) this.m_clickDrag[c] && c ? this._myShape.graphics.moveTo(this._touchPointArr[c - 1].x, this._touchPointArr[c - 1].y) : this._myShape.graphics.moveTo(this._touchPointArr[c].x - 1, this._touchPointArr[c].y),
            this._myShape.graphics.lineTo(this._touchPointArr[c].x, this._touchPointArr[c].y);
        this._myShape.graphics.endFill()
    };
    e.clearTouchPoints =

        function () {
            this._touchPointArr && delete this._touchPointArr;
            this.m_clickDrag && delete this.m_clickDrag;
            this._touchPointArr = [];
            this.m_clickDrag = []
        };
    e.clearDraw = function () {
        this._myShape.graphics.clear()
    };
    e.onTouchBegin = function (c) {
        console.log("touch begins");
        this._isDraw = !0;
        this.addTouchPoint(c.localX, c.localY);
        this.redraw();
        this._touchEvent = c
    };
    e.onTouchMoved = function (c) {
        this._isDraw && (this.addTouchPoint(c.localX, c.localY, !0), this.redraw());
        c.preventDefault()
    };
    e.onTouchEnded = function (c) {
        console.log("touch ends");
        this._isDraw = !1;
        var b = new egret.Point(c.localX, c.localY);
        c = this._touchPointArr[0];
        var a = b.x - c.x,
            b = b.y - c.y,
            d = Math.sqrt(a * a + b * b);
        if (10 < d) for (var d = Math.round(d / 5), e = 0; e < d; e++) this._touchPointArr.push(new egret.Point(a / d * (e + 1) + c.x, b / d * (e + 1) + c.y)),
            this.m_clickDrag.push(!0);
        this._myShape.graphics.moveTo(this._touchPointArr[0].x, this._touchPointArr[0].y);
        this._myShape.graphics.lineTo(this._touchPointArr[this._touchPointArr.length - 1].x, this._touchPointArr[this._touchPointArr.length - 1].y);
        guodong.CustomEventDispatcher.getInstance().dispatch("draw_end", null)
    };
    Object.defineProperty(e, "positionList", {
        get: function () {
            return this._touchPointArr
        },
        enumerable: !0,
        configurable: !0
    });
    return f
}(egret.Sprite);
DrawLayer.prototype.__class__ = "DrawLayer";
var PopupWindow = function (d) {
    function f() {
        d.call(this);
        this.init()
    }
    __extends(f, d);
    var e = f.prototype;
    f.getInstance = function () {
        void 0 == f._instance && (f._instance = new f);
        return f._instance
    };
    e.init = function () {
        this._bgLayout = new egret.DisplayObjectContainer;
        this._uiLayout = new egret.DisplayObjectContainer;
        this._gameLayout = new egret.DisplayObjectContainer;
        this.addChild(this._bgLayout);
        this.addChild(this._gameLayout);
        this.addChild(this._uiLayout);
        var c = new egret.Sprite;
        c.graphics.beginFill(0, 0.7);
        c.graphics.drawRect(0, 0, 640, 1300);
        c.graphics.endFill();
        c.width = 640;
        c.height = 1300;
        c.touchEnabled = !0;
        this._bgLayout.addChild(c);
        this._bgLayout.alpha = 0;
        this._bgLayout.visible = !1;
        this._popupArr = [];
        this._popupArr.push(new Popup1);
        this._popupArr.push(new Popup2);
        this._openPopupArr = []
    };
    e.showPopupById = function (c) {
        c = this._popupArr[c];
        this.addChild(c);
        this._openPopupArr.push(c);
        this._bgLayout.visible = !0;
        c.alpha = 0;
        egret.Tween.removeTweens(this._bgLayout);
        egret.Tween.get(this._bgLayout).to({
            alpha: 1
        }, 500);
        egret.Tween.get(c).to({
            alpha: 1
        }, 500)
    };
    e.removePopup = function (c) {
        c = this._popupArr[c];
        egret.Tween.removeTweens(c);
        egret.Tween.get(c).to({
            alpha: 0
        }, 500).call(this.removePopupComplete, this, [c]);
        1 == this._openPopupArr.length && egret.Tween.get(this._bgLayout).to({
            alpha: 0
        }, 500)
    };
    e.removePopupComplete = function (c) {
        this.removeChild(c);
        c = this.getIndexByPopup(c); - 1 < c && this._openPopupArr.splice(c, 1);
        0 == this._openPopupArr.length && (this._bgLayout.alpha = 0, this._bgLayout.visible = !1)
    };
    e.getIndexByPopup = function (c) {
        for (var b = 0; b < this._openPopupArr.length; b++) if (this._openPopupArr[b] == c) return b;
        return -1
    };
    return f
}(egret.DisplayObjectContainer);
PopupWindow.prototype.__class__ = "PopupWindow";
var Popup1 = function (d) {
    function f() {
        d.call(this);
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        this._txt = new egret.TextField;
        this._txt.width = 640;
        this._txt.y = 300;
        this._txt.height = 100;
        this._txt.textAlign = "center";
        this.addChild(this._txt);
        this._btn1 = guodong.ResUtil.createBitmapByName("replay_btn_png");
        this._btn1.x = 157;
        this._btn1.y = 720;
        this._btn1.name = "btn1";
        this._btn1.touchEnabled = !0;
        this.addChild(this._btn1);
        this._btn1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
        this._btn2 = guodong.ResUtil.createBitmapByName("share_btn_png");
        this._btn2.x = 326;
        this._btn2.y = 720;
        this._btn2.name = "btn2";
        this._btn2.touchEnabled = !0;
        this.addChild(this._btn2);
        this._btn2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this)
    }
    __extends(f, d);
    var e = f.prototype;
    e.onAddToStage = function (c) {
        this._btn1.touchEnabled = this._btn2.touchEnabled = !0;
        c = GameVO.GAME_SCORE.toString();
        c = c.substring(0, c.indexOf(".") + 3);
        this._txt.text = "\u4f60\u753b\u4e86\u4e00\u4e2a" + c + "\u5206\u7684O\n\u7acb\u523b\u5206\u4eab\u4e00\u4e0b\u670b\u53cb\u5708\n\u627e\u5230\u4e0e\u4f60\u4e00\u6837\u7684\u6709O\u4eba!";
        this._txt.bold = !0;
        this._txt.lineSpacing = 10
    };
    e.onTouchTap = function (c) {
        "btn1" == c.currentTarget.name ? (PopupWindow.getInstance().removePopup(f.POPUP_ID), guodong.CustomEventDispatcher.getInstance().dispatch(GameEvent.POPUP_BTN_CLICK, "game_reply"), this._btn1.touchEnabled = !1) : "btn2" == c.currentTarget.name && PopupWindow.getInstance().showPopupById(Popup2.POPUP_ID)
    };
    f.POPUP_ID = 0;
    return f
}(egret.Sprite);
Popup1.prototype.__class__ = "Popup1";
var Popup2 = function (d) {
    function f() {
        d.call(this);
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        var c = guodong.DisplayObjectUtil.getColorSprite(640, 1300, 0, 0.6);
        this.addChild(c);
        c = guodong.ResUtil.createBitmapByName("share_tips_png");
        c.x = 190;
        c.y = 60;
        this.addChild(c);
        this._touchSp = guodong.DisplayObjectUtil.getEmptyTouchSprite(640, 1300);
        this.addChild(this._touchSp);
        this._touchSp.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this)
    }
    __extends(f, d);
    var e = f.prototype;
    e.onAddToStage = function (c) {
        this._touchSp.touchEnabled = !0
    };
    e.onTouchTap = function (c) {
        PopupWindow.getInstance().removePopup(f.POPUP_ID)
    };
    f.POPUP_ID = 1;
    return f
}(egret.Sprite);
Popup2.prototype.__class__ = "Popup2";
var ArrowBtn = function (d) {
    function f() {
        d.call(this);
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this)
    }
    __extends(f, d);
    var e = f.prototype;
    e.onAddToStage = function (c) {
        this._arrowIcon = guodong.ResUtil.createBitmapByName("arrow_png");
        this._arrowIcon.x = -1 * this._arrowIcon.width / 2;
        this.addChild(this._arrowIcon);
        egret.Tween.get(this._arrowIcon, {
            loop: !0
        }).to({
            y: 10,
            alpha: 0
        }, 800).wait(200)
    };
    e.destroy = function () {
        egret.Tween.removeTweens(this._arrowIcon);
        this.removeChild(this._arrowIcon);
        this.parent.removeChild(this)
    };
    return f
}(egret.Sprite);
ArrowBtn.prototype.__class__ = "ArrowBtn";
var Game = function (d) {
    function f() {
        d.call(this);
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this)
    }
    __extends(f, d);
    var e = f.prototype;
    e.onAddToStage = function (c) {
        this.alpha = 0;
        egret.Tween.get(this).to({
            alpha: 1
        }, 500);
        this._bgLayout = new egret.DisplayObjectContainer;
        this._uiLayout = new egret.DisplayObjectContainer;
        this._gameLayout = new egret.DisplayObjectContainer;
        this.addChild(this._bgLayout);
        this.addChild(this._gameLayout);
        this.addChild(this._uiLayout);
        c = guodong.ResUtil.createBitmapByName("page3_txt_png");
        c.x = 250;
        c.y = 87;
        this._bgLayout.addChild(c);
        this._gameInfo = guodong.ResUtil.createBitmapByName("game_info_png");
        this._gameInfo.x = 217;
        this._gameInfo.y = 277;
        this._uiLayout.addChild(this._gameInfo);
        this._gameStartBtn = guodong.ResUtil.createBitmapByName("game_btn_png");
        this._gameStartBtn.x = 264;
        this._gameStartBtn.y = 675;
        this._uiLayout.addChild(this._gameStartBtn);
        this._gameStartBtn.touchEnabled = true;
        this._uiLayout.touchEnabled = true;
        this._gameStartBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.gameStartTapHandler, this);
        this._radius = 200;
        this._referenceCircle = new egret.Sprite;
        this._referenceCircle.x = 320;
        this._referenceCircle.y = 500;
        this._gameLayout.addChild(this._referenceCircle);
        this._referenceCircle.graphics.lineStyle(6, 12628630);
        this.drawArc(this._referenceCircle.graphics, this._radius, 0, 360);
        this._referenceLine = new egret.Sprite;
        this._referenceLine.x = 320;
        this._referenceLine.y = 500;
        this._gameLayout.addChild(this._referenceLine);
        c = this._radius * Math.cos(-30 * Math.PI / 180);
        var b = this._radius * Math.sin(-30 * Math.PI / 180);
        this._referenceLine.graphics.lineStyle(1, 10066329);
        this._referenceLine.graphics.moveTo(0, 0);
        this._referenceLine.graphics.lineTo(c, b);
        this._drawSprite = new egret.Sprite;
        this._drawSprite.x = 320;
        this._drawSprite.y = 500;
        this._gameLayout.addChild(this._drawSprite);
        this._drawSprite.graphics.lineStyle(1, 16754944);
        this._drawLayout = new DrawLayer;
        this._drawLayout.x = 320;
        this._drawLayout.y = 500;
        this._drawLayout.touchEnabled = !1;
        this._gameLayout.addChild(this._drawLayout);
        this._checkTimer = new egret.Timer(50);
        this._checkTimer.addEventListener(egret.TimerEvent.TIMER, this.onCheckTimerHandler, this);
        this._checkIndex = 0;
        this._checkNumArr = [];
        this._gameLayout.visible = !1;
        guodong.CustomEventDispatcher.getInstance().addEventListener("draw_end", this.drawEndHandler, this);
        guodong.CustomEventDispatcher.getInstance().addEventListener(GameEvent.POPUP_BTN_CLICK, this.popupClickHandler, this);
        AppConfig.playMusci()
    };
    e.gameStart = function () {
        this._drawLayout.touchEnabled = !0;
        egret.Tween.get(this._referenceCircle).to({
            alpha: 0
        }, 500)
    };
    e.gameOver = function () {
        PopupWindow.getInstance().showPopupById(Popup1.POPUP_ID)
    };
    e.gameReplay = function () {
        this._checkIndex = 0;
        this._checkNumArr = [];
        this._drawLayout.clearTouchPoints();
        this._drawLayout.clearDraw();
        this._drawSprite.graphics.clear();
        this._drawSprite.graphics.lineStyle(1, 16754944);
        this.gameStart()
    };
    e.drawArc = function (c, b, a, d) {
        for (var e = a; e <= d; e++) {
            var f = b * Math.cos(-e * Math.PI / 180),
                s = b * Math.sin(-e * Math.PI / 180);
            e == a && c.moveTo(f, s);
            c.lineTo(f, s)
        }
    };
    e.checkScore = function (c, b, a) {
        for (var d = 10; d < b; d++) for (var e = this._radius * Math.cos(-a * Math.PI / 180), f = this._radius * Math.sin(-a * Math.PI / 180), s = d * Math.cos(-a * Math.PI / 180), k = d * Math.sin(-a * Math.PI / 180), h = 0; h < c.length; h++) if (3 > egret.Point.distance(new egret.Point(c[h].x, c[h].y), new egret.Point(s, k))) return this._drawSprite.graphics.moveTo(e, f),
            this._drawSprite.graphics.lineTo(s, k),
            egret.Point.distance(new egret.Point(e, f), new egret.Point(s, k));
        return 100
    };
    e.drawLaser = function (c, b) {
        for (var a = 10; a < c; a++) {
            Math.cos(-b * Math.PI / 180);
            Math.sin(-b * Math.PI / 180);
            var d = a * Math.cos(-b * Math.PI / 180),
                e = a * Math.sin(-b * Math.PI / 180);
            this._drawSprite.graphics.moveTo(0, 0);
            this._drawSprite.graphics.lineTo(d, e)
        }
    };
    e.gameStartTapHandler = function (c) {
        console.log("this is the where starts.");
        var b = this;
        this._gameStartBtn.visible = !1;
        this._gameLayout.visible = !0;
        this._gameInfo.visible = !1;
        egret.setTimeout(function (a) {
            b.gameStart()
        }, this, 500)
    };
    e.onCheckTimerHandler = function (c) {
        if (360 >= this._checkIndex) this._checkNumArr.push(this.checkScore(this._drawLayout.positionList, 400, this._checkIndex)),
            this._checkIndex += 10;
        else {
            this._checkTimer.stop();
            for (var b = c = 0; b < this._checkNumArr.length; b++) c += this._checkNumArr[b];
            c = 100 - c / this._checkNumArr.length;
            0 > c && (c = 0);
            GameVO.GAME_SCORE = c;
            AppConfig.setShareInfo(c);
            this.gameOver()
        }
    };
    e.drawEndHandler = function (c) {
        console.log("check....");
        this._drawLayout.touchEnabled = !1;
        egret.Tween.get(this._referenceCircle).to({
            alpha: 1
        }, 500);
        this._checkTimer.start()
    };
    e.popupClickHandler = function (c) {
        "game_reply" == c.data && this.gameReplay()
    };
    return f
}(egret.DisplayObjectContainer);
Game.prototype.__class__ = "Game";
var LoadingUI = function (d) {
    function f() {
        d.call(this);
        this.createView()
    }
    __extends(f, d);
    var e = f.prototype;
    e.createView = function () {
        this.textField = new egret.TextField;
        this.addChild(this.textField);
        this.textField.y = 300;
        this.textField.width = 640;
        this.textField.height = 100;
        this.textField.textAlign = "center"
    };
    e.setProgress = function (c, b) {
        this.textField.text = Math.round(c / b * 100) + "%"
    };
    return f
}(egret.Sprite);
LoadingUI.prototype.__class__ = "LoadingUI";
var Page1 = function (d) {
    function f() {
        d.call(this);
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveStage, this)
    }
    __extends(f, d);
    var e = f.prototype;
    e.onAddToStage = function (c) {
        this._bgLayout = new egret.DisplayObjectContainer;
        this._uiLayout = new egret.DisplayObjectContainer;
        this._gameLayout = new egret.DisplayObjectContainer;
        this.addChild(this._bgLayout);
        this.addChild(this._gameLayout);
        this.addChild(this._uiLayout);
        c = guodong.ResUtil.createBitmapByName("bg_jpg");
        this._bgLayout.addChild(c);
        this._shine = guodong.ResUtil.createBitmapByName("page1_logo_shine_png");
        this._shine.x = 143;
        this._shine.y = 580;
        this.addChild(this._shine);
        c = guodong.ResUtil.createBitmapByName("page1_logo_png");
        c.x = 140;
        c.y = 376;
        this._bgLayout.addChild(c);
        egret.Tween.get(this._shine, {
            loop: !0
        }).to({
            alpha: 0
        }, 1E3).to({
            alpha: 1
        }, 1E3)
    };
    e.onRemoveStage = function (c) {
        egret.Tween.removeTweens(this._shine)
    };
    return f
}(egret.DisplayObjectContainer);
Page1.prototype.__class__ = "Page1";
var Page2 = function (d) {
    function f() {
        d.call(this);
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this)
    }
    __extends(f, d);
    f.prototype.onAddToStage = function (d) {
        this.alpha = 0;
        egret.Tween.get(this).to({
            alpha: 1
        }, 500);
        this._bgLayout = new egret.DisplayObjectContainer;
        this._uiLayout = new egret.DisplayObjectContainer;
        this._gameLayout = new egret.DisplayObjectContainer;
        this.addChild(this._bgLayout);
        this.addChild(this._gameLayout);
        this.addChild(this._uiLayout);
        d = guodong.ResUtil.createBitmapByName("bg2_jpg");
        d.y = -450;
        this._bgLayout.addChild(d);
        var c = guodong.ResUtil.createBitmapByName("page2_txt1_png");
        c.x = 225;
        c.y = 114;
        this._gameLayout.addChild(c);
        var b = guodong.ResUtil.createBitmapByName("page2_txt2_png");
        b.x = 125;
        b.y = 207;
        this._gameLayout.addChild(b);
        var a = guodong.ResUtil.createBitmapByName("page2_txt3_png");
        a.x = 70;
        a.y = 28;
        this._gameLayout.addChild(a);
        var f = guodong.ResUtil.createBitmapByName("page2_man_png");
        f.x = 0;
        f.y = 190;
        this._gameLayout.addChild(f);
        c.alpha = 0;
        b.alpha = 0;
        a.alpha = 0;
        egret.Tween.get(c).wait(1200).to({
            alpha: 1
        }, 800);
        egret.Tween.get(b).wait(1800).to({
            alpha: 1
        }, 800);
        egret.Tween.get(a).wait(2E3).to({
            alpha: 1
        }, 800);
        egret.Tween.get(d).wait(800).to({
            y: 0
        }, 8E3)
    };
    return f
}(egret.DisplayObjectContainer);
Page2.prototype.__class__ = "Page2";
var Page3 = function (d) {
    function f() {
        d.call(this);
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveStage, this)
    }
    __extends(f, d);
    var e = f.prototype;
    e.onAddToStage = function (c) {
        var b = this;
        this.alpha = 0;
        egret.Tween.get(this).to({
            alpha: 1
        }, 500);
        this._bgLayout = new egret.DisplayObjectContainer;
        this._uiLayout = new egret.DisplayObjectContainer;
        this._gameLayout = new egret.DisplayObjectContainer;
        this.addChild(this._bgLayout);
        this.addChild(this._gameLayout);
        this.addChild(this._uiLayout);
        c = guodong.ResUtil.createBitmapByName("bg_jpg");
        this._bgLayout.addChild(c);
        c = guodong.ResUtil.createBitmapByName("page3_txt_png");
        c.x = 227;
        c.y = 87;
        this._gameLayout.addChild(c);
        c = guodong.ResUtil.createBitmapByName("page4_line_png");
        c.y = 155;
        this._gameLayout.addChild(c);
        this._pic = guodong.ResUtil.createBitmapByName("page4_pic_png");
        this._pic.x = -250;
        this._pic.y = 157;
        this._gameLayout.addChild(this._pic);
        c = guodong.ResUtil.createBitmapByName("page4_txt1_png");
        c.x = 140;
        c.y = 230;
        this._gameLayout.addChild(c);
        c = guodong.ResUtil.createBitmapByName("page4_txt2_png");
        c.x = 60;
        c.y = 650;
        this._gameLayout.addChild(c);
        egret.setTimeout(function (a) {
            egret.Tween.get(b._pic, {
                loop: !0
            }).to({
                x: 0
            }, 4E3).wait(1E3).to({
                x: -450
            }, 4E3).wait(1E3).to({
                x: -250
            }, 1500).wait(1E3)
        }, this, 1E3)
    };
    e.onRemoveStage = function (c) {
        egret.Tween.removeTweens(this._pic)
    };
    return f
}(egret.DisplayObjectContainer);
Page3.prototype.__class__ = "Page3";
var Page4 = function (d) {
    function f() {
        d.call(this);
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this)
    }
    __extends(f, d);
    f.prototype.onAddToStage = function (d) {
        this.alpha = 0;
        egret.Tween.get(this).to({
            alpha: 1
        }, 500);
        this._bgLayout = new egret.DisplayObjectContainer;
        this._uiLayout = new egret.DisplayObjectContainer;
        this._gameLayout = new egret.DisplayObjectContainer;
        this.addChild(this._bgLayout);
        this.addChild(this._gameLayout);
        this.addChild(this._uiLayout);
        d = guodong.ResUtil.createBitmapByName("bg");
        this._bgLayout.addChild(d);
        d = guodong.ResUtil.createBitmapByName("page3_txt_png");
        d.x = 227;
        d.y = 87;
        this._gameLayout.addChild(d);
        d = guodong.ResUtil.createBitmapByName("page5_txt2_png");
        d.x = 125;
        d.y = 155;
        this._gameLayout.addChild(d);
        d = guodong.ResUtil.createBitmapByName("page5_pic_png");
        d.x = 100;
        d.y = 305;
        this._gameLayout.addChild(d);
        d = guodong.ResUtil.createBitmapByName("page6_txt1_png");
        d.x = 217;
        d.y = 790;
        this.addChild(d)
    };
    return f
}(egret.DisplayObjectContainer);
Page4.prototype.__class__ = "Page4";
var Page5 = function (d) {
    function f() {
        d.call(this);
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this)
    }
    __extends(f, d);
    f.prototype.onAddToStage = function (d) {
        this.alpha = 0;
        egret.Tween.get(this).to({
            alpha: 1
        }, 500);
        this._bgLayout = new egret.DisplayObjectContainer;
        this._uiLayout = new egret.DisplayObjectContainer;
        this._gameLayout = new egret.DisplayObjectContainer;
        this.addChild(this._bgLayout);
        this.addChild(this._gameLayout);
        this.addChild(this._uiLayout);
        d = guodong.ResUtil.createBitmapByName("bg");
        this._bgLayout.addChild(d);
        d = guodong.ResUtil.createBitmapByName("page3_txt_png");
        d.x = 227;
        d.y = 87;
        this._gameLayout.addChild(d);
        d = guodong.ResUtil.createBitmapByName("page5_txt2_png");
        d.x = 125;
        d.y = 155;
        this._gameLayout.addChild(d);
        d = guodong.ResUtil.createBitmapByName("pic6_pic_png");
        d.x = 100;
        d.y = 305;
        this._gameLayout.addChild(d);
        d = guodong.ResUtil.createBitmapByName("page7_txt1_png");
        d.x = 232;
        d.y = 790;
        this.addChild(d)
    };
    return f
}(egret.DisplayObjectContainer);
Page5.prototype.__class__ = "Page5";
var Page6 = function (d) {
    function f() {
        d.call(this);
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this)
    }
    __extends(f, d);
    f.prototype.onAddToStage = function (d) {
        this.alpha = 0;
        egret.Tween.get(this).to({
            alpha: 1
        }, 500);
        this._bgLayout = new egret.DisplayObjectContainer;
        this._uiLayout = new egret.DisplayObjectContainer;
        this._gameLayout = new egret.DisplayObjectContainer;
        this.addChild(this._bgLayout);
        this.addChild(this._gameLayout);
        this.addChild(this._uiLayout);
        d = guodong.ResUtil.createBitmapByName("bg3_jpg");
        this._bgLayout.addChild(d);
        d = guodong.ResUtil.createBitmapByName("page2_txt1_png");
        d.x = 225;
        d.y = 114;
        this._bgLayout.addChild(d);
        d = guodong.ResUtil.createBitmapByName("page33_png");
        d.x = 81;
        d.y = 465;
        this._bgLayout.addChild(d);
        egret.Tween.get(this).wait(600).call(function (c) {
            AppConfig.showDiv(1)
        }, this)
    };
    return f
}(egret.DisplayObjectContainer);
Page6.prototype.__class__ = "Page6";
var Page7 = function (d) {
    function f() {
        d.call(this);
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this)
    }
    __extends(f, d);
    f.prototype.onAddToStage = function (d) {
        this.alpha = 0;
        egret.Tween.get(this).to({
            alpha: 1
        }, 500);
        this._bgLayout = new egret.DisplayObjectContainer;
        this._uiLayout = new egret.DisplayObjectContainer;
        this._gameLayout = new egret.DisplayObjectContainer;
        this.addChild(this._bgLayout);
        this.addChild(this._gameLayout);
        this.addChild(this._uiLayout);
        d = guodong.ResUtil.createBitmapByName("bg_jpg");
        this._bgLayout.addChild(d);
        d = guodong.ResUtil.createBitmapByName("page333_png");
        d.x = 115;
        d.y = 87;
        this._gameLayout.addChild(d);
        d = guodong.ResUtil.createBitmapByName("page3_pic2_png");
        d.x = 116;
        d.y = 240;
        this._gameLayout.addChild(d);
        var c = guodong.ResUtil.createBitmapByName("page3_txt2_png");
        c.x = 120;
        c.y = 510;
        this._gameLayout.addChild(c);
        d.alpha = 0;
        c.alpha = 0;
        egret.Tween.get(d).wait(1E3).to({
            alpha: 1
        }, 800);
        egret.Tween.get(c).wait(1200).to({
            alpha: 1
        }, 800)
    };
    return f
}(egret.DisplayObjectContainer);
Page7.prototype.__class__ = "Page7";
var Main = function (d) {
    function f() {
        d.call(this);
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this)
    }
    __extends(f, d);
    var e = f.prototype;
    e.onAddToStage = function (c) {
        this.loadingView = new LoadingUI;
        this.stage.addChild(this.loadingView);
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/resource.json", "resource/")
    };
    e.onConfigComplete = function (c) {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.loadGroup("game")
    };
    e.onResourceLoadComplete = function (c) {
        "game" == c.groupName && (this.stage.removeChild(this.loadingView), RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this), RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this), RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this), this.createStage(), this.createGameScene())
    };
    e.onResourceLoadError = function (c) {
        console.warn("Group:" + c.groupName + " has failed to load");
        this.onResourceLoadComplete(c)
    };
    e.onResourceProgress = function (c) {
        "game" == c.groupName && this.loadingView.setProgress(c.itemsLoaded, c.itemsTotal)
    };
    e.createStage = function () {
        console.log("ver1.0", egret.MainContext.instance.stage.stageWidth, egret.MainContext.instance.stage.stageHeight);
        this._bgLayout = new egret.DisplayObjectContainer;
        this._uiLayout = new egret.DisplayObjectContainer;
        this._gameLayout = new egret.DisplayObjectContainer;
        this.addChild(this._bgLayout);
        this.addChild(this._gameLayout);
        this.addChild(this._uiLayout);
        this._bgLayout.addChild(guodong.ResUtil.createBitmapByName("bg_jpg"));
        this._uiLayout.addChild(PopupWindow.getInstance());
        this._touchSp = guodong.DisplayObjectUtil.getEmptyTouchSprite(640, 1200);
        //this._uiLayout.addChild(this._touchSp);
        this._touchSp.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
        this._touchSp.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchHandler, this);
        this._touchSp.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchHandler, this)
    };
    e.createGameScene = function () {
        /*this._isMoveing = !1;
         this._pageId = 1;
         var c = new Page1;
         c.name = "page1";
         this._gameLayout.addChild(c);
         c.alpha = 0;
         egret.Tween.get(c).to({
         alpha: 1
         }, 500);
         this._arrow = new ArrowBtn;
         this._arrow.x = egret.MainContext.instance.stage.stageWidth / 2;
         this._arrow.y = egret.MainContext.instance.stage.stageHeight - 50;
         this._uiLayout.addChild(this._arrow)*/
        this._isMoveing = false;
        this.enterGameDirectly();
    };

    e.enterGameDirectly = function (){
        this._gameLayout.removeChildren();
        var game = new Game();
        this._gameLayout.addChild(game);
        AppConfig.tracking("game")
    }

    e.nextPage = function (c) {
        var b = this,
            a = this._gameLayout.getChildByName("page" + String(c - 1)),
            d = this.getPageById(c);
        d.name = "page" + c;
        this._gameLayout.addChild(d);
        d.y = 1039;
        egret.Tween.get(a).to({
            y: -1039
        }, 800, egret.Ease.quartOut);
        egret.Tween.get(d).to({
            y: 0
        }, 800, egret.Ease.quartOut).call(function (c) {
            b._isMoveing = !1;
            b._arrow.visible = !0;
            b._gameLayout.removeChild(a)
        }, this);
        AppConfig.tracking("page" + c)
    };
    e.prevPage = function (c) {
        var b = this,
            a = this._gameLayout.getChildByName("page" + String(c + 1)),
            d = this.getPageById(c);
        d.name = "page" + c;
        this._gameLayout.addChild(d);
        d.y = -1039;
        egret.Tween.get(a).to({
            y: 1039
        }, 800, egret.Ease.quartOut);
        egret.Tween.get(d).to({
            y: 0
        }, 800, egret.Ease.quartOut).call(function (c) {
            b._isMoveing = !1;
            b._arrow.visible = !0;
            b._gameLayout.removeChild(a)
        }, this);
        AppConfig.tracking("page" + c)
    };
    e.gotoGame = function () {
        var c = this,
            b = this._gameLayout.getChildByName("page6");
        egret.Tween.get(b).to({
            y: -1039
        }, 500).call(function (a) {
            c._gameLayout.removeChildren();
            a = new Game;
            c._gameLayout.addChild(a)
        }, this);
        AppConfig.tracking("game")
    };
    e.getPageById = function (c) {
        var b;
        switch (c) {
            case 1:
                b = new Page1;
                break;
            case 2:
                b = new Page2;
                break;
            case 3:
                b = new Page3;
                break;
            case 4:
                b = new Page4;
                break;
            case 5:
                b = new Page5;
                break;
            case 6:
                b = new Page6;
                break;
            case 7:
                b = new Page7
        }
        return b
    };
    e.onTouchHandler = function (c) {
        c.type == egret.TouchEvent.TOUCH_BEGIN ? this._touchY = c.stageY : c.type == egret.TouchEvent.TOUCH_END && (10 < this._touchY - c.stageY && !1 == this._isMoveing ? 6 > this._pageId ? (this._isMoveing = !0, this._arrow.visible = !1, this._pageId += 1, this.nextPage(this._pageId)) : (AppConfig.showDiv(0), console.log("\u51fa\u73b0\u6e38\u620f"), this._arrow.visible = !1, this._touchSp.touchEnabled = !1, this.enterGameDirectly()) : 0 > this._touchY - c.stageY && 10 > this._touchY - c.stageY && !1 == this._isMoveing && 1 < this._pageId && (this._isMoveing = !0, this._arrow.visible = !1, this._pageId -= 1, this.prevPage(this._pageId), AppConfig.showDiv(0)))
    };
    return f
}(egret.DisplayObjectContainer);
Main.prototype.__class__ = "Main";
