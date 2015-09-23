//绘制区域
var DrawLayer = function (d) {
    function f() {
        d.call(this);
        this._touchPointArr = [];
        this.m_clickDrag = [];
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
        this.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMoved, this);
        this.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnded, this);
    }
    __extends(f, d);
    var e = f.prototype;
    e.onAddToStage = function (c) {
        this._myShape = new egret.Shape;
        this.addChild(this._myShape);
        this.touchChildren = !1;
        this.touchEnabled = !0;
        c = game.DisplayObjectUtil.getEmptyTouchSprite(640, 1200);
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
        for (var c = 0; c < this._touchPointArr.length; c++)
            this.m_clickDrag[c] && c ?
            this._myShape.graphics.moveTo(this._touchPointArr[c - 1].x, this._touchPointArr[c - 1].y) :
            this._myShape.graphics.moveTo(this._touchPointArr[c].x - 1, this._touchPointArr[c].y),
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
        game.CustomEventDispatcher.getInstance().dispatch("draw_end", null)
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
        this._popupArr.push(new GameOverWindow);
        this._popupArr.push(new ShareWindow);
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

//每次画圆结束的结算，包含分享和再玩一次
var GameOverWindow = function (d) {
    function f() {
        d.call(this);
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        this._txt = new egret.TextField;
        this._txt.width = 640;
        this._txt.y = 300;
        this._txt.height = 100;
        this._txt.textAlign = "center";
        this.addChild(this._txt);
        this._btn1 = game.ResUtil.createBitmapByName("replay_btn_png");
        this._btn1.x = 157;
        this._btn1.y = 720;
        this._btn1.name = "btn1";
        this._btn1.touchEnabled = !0;
        this.addChild(this._btn1);
        this._btn1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
        this._btn2 = game.ResUtil.createBitmapByName("share_btn_png");
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
        this._txt.text = "你画了一个" + c + "分的O\n立刻分享一下朋友圈\n找到与你一样的有O人！";
        this._txt.bold = !0;
        this._txt.lineSpacing = 10
    };
    //是否分享，继续玩
    e.onTouchTap = function (c) {
        "btn1" == c.currentTarget.name ?
            (PopupWindow.getInstance().removePopup(f.POPUP_ID),
             game.CustomEventDispatcher.getInstance().dispatch(GameEvent.POPUP_BTN_CLICK, "game_reply"),
             this._btn1.touchEnabled = !1) :
             "btn2" == c.currentTarget.name && PopupWindow.getInstance().showPopupById(ShareWindow.POPUP_ID)
    };
    f.POPUP_ID = 0;
    return f
}(egret.Sprite);
GameOverWindow.prototype.__class__ = "GameOverWindow";

//分享提示界面
var ShareWindow = function (d) {
    function f() {
        d.call(this);
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        var c = game.DisplayObjectUtil.getColorSprite(640, 1300, 0, 0.6);
        this.addChild(c);
        c = game.ResUtil.createBitmapByName("share_tips_png");
        c.x = 190;
        c.y = 60;
        this.addChild(c);
        this._touchSp = game.DisplayObjectUtil.getEmptyTouchSprite(640, 1300);
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
ShareWindow.prototype.__class__ = "ShareWindow";

//游戏核心
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
        c = game.ResUtil.createBitmapByName("page3_txt_png");
        c.x = 250;
        c.y = 87;
        this._bgLayout.addChild(c);
        this._gameInfo = game.ResUtil.createBitmapByName("game_info_png");
        this._gameInfo.x = 217;
        this._gameInfo.y = 277;
        this._uiLayout.addChild(this._gameInfo);
        this._gameStartBtn = game.ResUtil.createBitmapByName("game_btn_png");
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
        game.CustomEventDispatcher.getInstance().addEventListener("draw_end", this.drawEndHandler, this);
        game.CustomEventDispatcher.getInstance().addEventListener(GameEvent.POPUP_BTN_CLICK, this.popupClickHandler, this);
        AppConfig.playMusci()
    };
    e.gameStart = function () {
        this._drawLayout.touchEnabled = !0;
        egret.Tween.get(this._referenceCircle).to({
            alpha: 0
        }, 500)
    };
    e.gameOver = function () {
        PopupWindow.getInstance().showPopupById(GameOverWindow.POPUP_ID)
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

//进度条
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

//主函数，整个游戏的入口
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
    //资源配置文件加载完成
    e.onConfigComplete = function (c) {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.loadGroup("game")
    };
    //资源加载出错
    e.onResourceLoadError = function (c) {
        console.warn("Group:" + c.groupName + " has failed to load");
        this.onResourceLoadComplete(c)
    };
    //资源进度
    e.onResourceProgress = function (c) {
        "game" == c.groupName && this.loadingView.setProgress(c.itemsLoaded, c.itemsTotal)
    };
    //预加载资源加载完成,创建游戏
    e.onResourceLoadComplete = function (c) {
        "game" == c.groupName &&
        (this.stage.removeChild(this.loadingView),
         RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this),
         RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this),
         RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this),
         this.createStage(),
         this.createGameScene());
    };

    e.createStage = function () {
        console.log("ver1.0", egret.MainContext.instance.stage.stageWidth, egret.MainContext.instance.stage.stageHeight);
        this._bgLayout = new egret.DisplayObjectContainer;
        this._uiLayout = new egret.DisplayObjectContainer;
        this._gameLayout = new egret.DisplayObjectContainer;
        this.addChild(this._bgLayout);
        this.addChild(this._gameLayout);
        this.addChild(this._uiLayout);
        this._bgLayout.addChild(game.ResUtil.createBitmapByName("bg_jpg"));
        this._uiLayout.addChild(PopupWindow.getInstance());
        this._touchSp = game.DisplayObjectUtil.getEmptyTouchSprite(640, 1200);
        //this._uiLayout.addChild(this._touchSp);
        this._touchSp.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
        this._touchSp.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchHandler, this);
        this._touchSp.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchHandler, this);
    };

    e.createGameScene = function () {
        this._isMoveing = false;
        this.enterGameDirectly();
    };

    e.enterGameDirectly = function (){
        this._gameLayout.removeChildren();
        var game = new Game();
        this._gameLayout.addChild(game);
        AppConfig.tracking("game")
    };

    e.onTouchHandler = function (c)
    {
        this.enterGameDirectly();
    };
    return f
}(egret.DisplayObjectContainer);
Main.prototype.__class__ = "Main";
