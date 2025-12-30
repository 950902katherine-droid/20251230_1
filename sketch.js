let stopSpritesheet;
let walkSpritesheet;
let jumpSpritesheet;
let pushSpritesheet;
// 新增第二個角色的精靈圖變數
let stopSpritesheet2;
let smileSpritesheet2;
let fallDownSpritesheet2;
// 新增第三個角色的精靈圖變數
let stopSpritesheet3;
// 新增第四個角色的精靈圖變數
let stopSpritesheet4;

let stopAnimation = [];
let walkAnimation = [];
let jumpAnimation = [];
let pushAnimation = [];
// 新增第二個角色的動畫陣列
let stopAnimation2 = [];
let smileAnimation2 = [];
let fallDownAnimation2 = [];
// 新增第三個角色的動畫陣列
let stopAnimation3 = [];
// 新增第四個角色的動畫陣列
let stopAnimation4 = [];


const stopSpriteWidth = 1597;
const stopSpriteHeight = 191;
const stopNumFrames = 18;
let stopFrameWidth;

const stopSpriteWidth2 = 535;
const stopSpriteHeight2 = 87;
const stopNumFrames2 = 9;
let stopFrameWidth2;

const smileSpriteWidth2 = 227;
const smileSpriteHeight2 = 101;
const smileNumFrames2 = 4;
let smileFrameWidth2;

const fallDownSpriteWidth2 = 1129;
const fallDownSpriteHeight2 = 74;
const fallDownNumFrames2 = 9;
let fallDownFrameWidth2;

const stopSpriteWidth3 = 1663;
const stopSpriteHeight3 = 212;
const stopNumFrames3 = 12;
let stopFrameWidth3;

const stopSpriteWidth4 = 583;
const stopSpriteHeight4 = 110;
const stopNumFrames4 = 7;
let stopFrameWidth4;

const targetHeight = 200; // 統一角色高度目標
let charScale1, charScale2, charScale3, charScale4;

const walkSpriteWidth = 1019;
const walkSpriteHeight = 195;
const walkNumFrames = 8;
let walkFrameWidth;

const jumpSpriteWidth = 3054;
const jumpSpriteHeight = 214;
const jumpNumFrames = 19;
let jumpFrameWidth;

const pushSpriteWidth = 5051;
const pushSpriteHeight = 191;
const pushNumFrames = 23;
let pushFrameWidth;

let bgImg;
let bgImg2; // 新增遊戲背景圖變數
let bgImg3; // 獲勝背景圖
let bgImg4; // 第三關背景圖
let bgX = 0;

let currentAnimation;
let charX, charY; // 主要角色位置
let charX2, charY2; // 第二個角色位置
let charX3, charY3; // 第三個角色位置
let charX4, charY4; // 第四個角色位置
let speed = 5; // 角色移動速度
let facingDirection = 1; // 1 代表朝右, -1 代表朝左
let facingDirection2 = 1; // 角色2的面向, 1 代表朝右, -1 代表朝左

let isSmiling2 = false;
let smileFrameIndex2 = 0;
const proximityThreshold = 150; // 觸發微笑的距離
let isInProximity = false; // 追蹤是否已在範圍內

let dialogueState = 0; // 0: 無對話, 1: 提問中, 2: 回答完畢
let dialogueText2 = ""; // 角色2的對話內容，初始為空
let nameInput; // 用於儲存 p5.dom 的輸入框物件
let char3HintText = ""; // 角色3的提示文字
let meteors = []; // 流星陣列
let fireworks = []; // 煙火陣列
let playerName = "";

// --- 新增角色4的互動變數 ---
let dialogueState4 = 0; // 0: 無對話, 1: 提問中, 2: 回答完畢
let dialogueText4 = "";
let currentQuestionRow4;
let isInProximity4 = false;

let startNameInput; // 開始畫面的姓名輸入框

// --- 遊戲狀態與轉場變數 ---
let gameState = 'START'; // START, NAME_INPUT, PLAYING, GAME_OVER
let transitionAlpha = 0;
let transitionMode = 'NONE'; // NONE, OUT, IN
let nextState = '';
let score = 0; // 計分
let char4Solved = false; // 角色4是否已解決
let char2Solved = false; // 角色2是否已解決
let level = 1; // 當前關卡: 1=orig_big_1, 2=orig_big_2, 3=orig_big_3
let conquerButton; // 攻佔下一顆星球按鈕

// --- 新增題庫相關變數 ---
let questionBank; // 儲存從 CSV 載入的題庫
let currentQuestionRow; // 儲存當前問題的整行數據
let availableQuestions = []; // 儲存可用題目的索引

// --- 新增 UI 按鈕相關變數 ---
let tryAgainButton;
let nextQuestionButton;
let lastAnswerCorrect = false; // 追蹤上一次回答是否正確

let isFalling2 = false; // 角色2是否被擊倒
let fallDownFrameIndex2 = 0;
const attackRange = 120; // 角色1的攻擊判定距離

let isJumping = false;
let jumpFrameIndex = 0;
let velocityY = 0;
const gravity = 0.6; // 重力加速度
const jumpStrength = -15; // 向上跳躍的力道
let originalY;

let isPushing = false;
let pushFrameIndex = 0;

// 預載入圖片資源
function preload() {
  // 載入位於 '1/stop/' 資料夾中的圖片精靈
  stopSpritesheet = loadImage('1/stop/stop.png');
  // 載入位於 '1/walk/' 資料夾中的圖片精靈
  walkSpritesheet = loadImage('1/walk/walk.png');
  // 載入位於 '1/jump/' 資料夾中的圖片精靈
  jumpSpritesheet = loadImage('1/jump/jump.png');
  // 載入位於 '1/push/' 資料夾中的圖片精靈
  pushSpritesheet = loadImage('1/push/push.png');
  // 載入背景圖片
  // bgImg = loadImage('orig_big.png'); // 暫時註解以解決 404 錯誤
  // 載入遊戲背景圖片
  bgImg2 = loadImage('orig_big_1.png');
  // 載入獲勝背景圖片
  bgImg3 = loadImage('orig_big_2.png');
  // 載入第三關背景圖片
  bgImg4 = loadImage('orig_big_3.png');
  // 載入第二個角色的圖片精靈
  stopSpritesheet2 = loadImage('2/stop/stop_2.png');
  // 載入第二個角色的微笑圖片精靈
  smileSpritesheet2 = loadImage('2/smile/smile2.png');
  // 載入角色2的倒下圖片精靈
  fallDownSpritesheet2 = loadImage('2/fall_down/fall_down_2.png');
  // 載入第三個角色的圖片精靈
  stopSpritesheet3 = loadImage('3/stop/all.png');
  // 載入第四個角色的圖片精靈
  stopSpritesheet4 = loadImage('4/stop/all.png');

  // --- 載入題庫 ---
  // 如果沒有 questions.csv，請先註解掉下面這行
  questionBank = loadTable('questions.csv', 'csv', 'header');
}

function setup() {
  // 創建一個全螢幕的畫布
  createCanvas(windowWidth, windowHeight);

  // 初始化可用題目索引
  if (questionBank) {
    for (let i = 0; i < questionBank.getRowCount(); i++) {
      availableQuestions.push(i);
    }
  }

  // --- 注入按鈕樣式與動畫 CSS ---
  let css = `
    @keyframes popIn {
      0% { transform: scale(0); opacity: 0; }
      70% { transform: scale(1.1); opacity: 1; }
      100% { transform: scale(1); opacity: 1; }
    }
    .conquer-btn {
      background-color: #ff4757 !important;
      color: white !important;
      border: 4px solid #000 !important;
      border-radius: 15px !important;
      font-family: "Arial Black", sans-serif !important;
      box-shadow: 0 8px 0 #000 !important;
      transition: all 0.1s !important;
      text-shadow: 2px 2px 0 #000 !important;
    }
    .conquer-btn:hover {
      transform: translateY(4px) !important;
      box-shadow: 0 4px 0 #000 !important;
    }
    .conquer-btn:active {
      transform: translateY(8px) !important;
      box-shadow: 0 0 0 #000 !important;
    }
    .pop-in {
      animation: popIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
    }
  `;
  createElement('style').html(css);

  // --- 處理站立動畫 ---
  stopFrameWidth = stopSpriteWidth / stopNumFrames;
  for (let i = 0; i < stopNumFrames; i++) {
    let x = i * stopFrameWidth;
    let img = stopSpritesheet.get(x, 0, stopFrameWidth, stopSpriteHeight);
    stopAnimation.push(img);
  }

  // --- 處理第二個站立動畫 ---
  stopFrameWidth2 = stopSpriteWidth2 / stopNumFrames2;
  for (let i = 0; i < stopNumFrames2; i++) {
    let x = i * stopFrameWidth2;
    let img = stopSpritesheet2.get(x, 0, stopFrameWidth2, stopSpriteHeight2);
    stopAnimation2.push(img);
  }

  // --- 處理第二個微笑動畫 ---
  smileFrameWidth2 = smileSpriteWidth2 / smileNumFrames2;
  for (let i = 0; i < smileNumFrames2; i++) {
    let x = i * smileFrameWidth2;
    let img = smileSpritesheet2.get(x, 0, smileFrameWidth2, smileSpriteHeight2);
    smileAnimation2.push(img);
  }

  // --- 處理角色2倒下動畫 ---
  fallDownFrameWidth2 = fallDownSpriteWidth2 / fallDownNumFrames2;
  for (let i = 0; i < fallDownNumFrames2; i++) {
    let x = i * fallDownFrameWidth2;
    let img = fallDownSpritesheet2.get(x, 0, fallDownFrameWidth2, fallDownSpriteHeight2);
    fallDownAnimation2.push(img);
  }

  // --- 處理第三個角色動畫 ---
  stopFrameWidth3 = stopSpriteWidth3 / stopNumFrames3;
  for (let i = 0; i < stopNumFrames3; i++) {
    let x = i * stopFrameWidth3;
    let img = stopSpritesheet3.get(x, 0, stopFrameWidth3, stopSpriteHeight3);
    stopAnimation3.push(img);
  }

  // --- 處理第四個角色動畫 ---
  stopFrameWidth4 = stopSpriteWidth4 / stopNumFrames4;
  for (let i = 0; i < stopNumFrames4; i++) {
    let x = i * stopFrameWidth4;
    let img = stopSpritesheet4.get(x, 0, stopFrameWidth4, stopSpriteHeight4);
    stopAnimation4.push(img);
  }

  // --- 處理走路動畫 ---
  walkFrameWidth = walkSpriteWidth / walkNumFrames;
  for (let i = 0; i < walkNumFrames; i++) {
    let x = i * walkFrameWidth;
    let img = walkSpritesheet.get(x, 0, walkFrameWidth, walkSpriteHeight);
    walkAnimation.push(img);
  }

  // --- 處理跳躍動畫 ---
  jumpFrameWidth = jumpSpriteWidth / jumpNumFrames;
  for (let i = 0; i < jumpNumFrames; i++) {
    let x = i * jumpFrameWidth;
    let img = jumpSpritesheet.get(x, 0, jumpFrameWidth, jumpSpriteHeight);
    jumpAnimation.push(img);
  }

  // --- 處理攻擊動畫 ---
  pushFrameWidth = pushSpriteWidth / pushNumFrames;
  for (let i = 0; i < pushNumFrames; i++) {
    let x = i * pushFrameWidth;
    let img = pushSpritesheet.get(x, 0, pushFrameWidth, pushSpriteHeight);
    pushAnimation.push(img);
  }

  // 預設顯示站立動畫
  currentAnimation = stopAnimation;

  // 計算縮放比例
  charScale1 = targetHeight / stopSpriteHeight;
  charScale2 = targetHeight / stopSpriteHeight2;
  charScale3 = targetHeight / stopSpriteHeight3;
  charScale4 = targetHeight / stopSpriteHeight4;

  // 初始化角色位置在畫布右邊 (與角色4互換)
  charX = width * 0.85;
  charY = height / 2;
  // 初始化第二個角色的位置在畫面中間偏右
  charX2 = width * 0.6;
  charY2 = height / 2;
  // 初始化第三個角色位置在畫布左邊
  charX3 = width * 0.15; // 設定在左側 15% 處
  charY3 = height / 2;
  // 初始化第四個角色位置在畫面中間偏左
  charX4 = width * 0.4;
  charY4 = height / 2;

  originalY = charY; // 記錄原始地面高度

  // 設定動畫播放速度
  frameRate(30); // 提高幀率讓跳躍更流暢

  // --- 創建 DOM 元素 ---
  nameInput = createInput(''); // 創建一個空的輸入框
  nameInput.hide(); // 預設隱藏
  nameInput.size(150, 20); // 設定輸入框大小

  // --- 創建按鈕 ---
  tryAgainButton = createButton('再作答一次');
  tryAgainButton.hide();
  tryAgainButton.mousePressed(retryQuestion);

  nextQuestionButton = createButton('下一題');
  nextQuestionButton.hide();
  nextQuestionButton.mousePressed(askNewQuestion);

  // --- 創建開始畫面的姓名輸入框 ---
  startNameInput = createInput('');
  startNameInput.size(200, 30);
  startNameInput.style('font-size', '20px');
  startNameInput.style('text-align', 'center');
  startNameInput.hide();

  // --- 創建攻佔按鈕 ---
  conquerButton = createButton('攻佔下一顆星球');
  conquerButton.size(400, 100); // 加大按鈕尺寸
  conquerButton.position(width / 2 - 200, height / 2 - 50); // 設定在畫面正中間
  conquerButton.class('conquer-btn'); // 套用 2D 風格 CSS 類別
  conquerButton.style('font-size', '32px'); // 加大字體
  conquerButton.style('font-weight', 'bold');
  conquerButton.style('cursor', 'pointer');
  conquerButton.hide();
  conquerButton.mousePressed(() => {
    conquerButton.hide();
    conquerButton.removeClass('pop-in'); // 重置動畫
    if (level === 1) {
      startTransition('LEVEL_2');
    } else if (level === 2) {
      startTransition('LEVEL_3');
    }
  });
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  charX = width * 0.85;
  charY = height / 2;
  charX2 = width * 0.6;
  charY2 = height / 2;
  charX3 = width * 0.15;
  charY3 = height / 2;
  charX4 = width * 0.4;
  charY4 = height / 2;
  conquerButton.position(width / 2 - 200, height / 2 - 50); // 視窗調整時保持按鈕置中
  originalY = charY;
}

// --- 自定義函式：取得不重複題目 ---
function getUniqueQuestion() {
  if (availableQuestions.length === 0) return null;
  let index = floor(random(availableQuestions.length));
  let qIndex = availableQuestions[index];
  availableQuestions.splice(index, 1); // 移除已使用的索引
  return questionBank.getRow(qIndex);
}

// 當按鍵被按下時觸發一次
function keyPressed() {
  // --- 處理姓名輸入狀態 ---
  if (gameState === 'NAME_INPUT') {
    if (keyCode === ENTER) {
      startTransition('PLAYING');
    }
    return;
  }

  if (gameState !== 'PLAYING') return; // 非遊戲狀態不處理以下邏輯

  // 優先處理跳躍和攻擊，避免動作衝突
  if (isJumping || isPushing) {
    return; // 如果正在跳躍或攻擊，不觸發新動作
  }
  if (keyCode === UP_ARROW) {
    isJumping = true;
    velocityY = jumpStrength;
    jumpFrameIndex = 0; // 從跳躍動畫的第一幀開始
  } else if (keyCode === DOWN_ARROW) { // 按下往下鍵
    isPushing = true;
    pushFrameIndex = 0; // 從攻擊動畫的第一幀開始
  }

  // 如果正在提問，且按下了 ENTER 鍵
  if (dialogueState === 1 && keyCode === ENTER) {
    let userAnswer = nameInput.value().trim(); // 獲取輸入的答案並去除前後空白
    let correctAnswer = currentQuestionRow.getString('答案');

    // 比對答案
    if (userAnswer === correctAnswer) {
      // 答案正確，顯示答對回饋
      dialogueText2 = currentQuestionRow.getString('答對回饋');
      lastAnswerCorrect = true;
      score += 10; // 答對加分
      char3HintText = ""; // 清除提示
      dialogueState = 2; // 進入回答完畢狀態 (顯示下一題按鈕)
      char2Solved = true; // 標記角色2已解決
      nameInput.value(''); // 答對後清空輸入框
      
      // 檢查是否兩題都答對
      if (char4Solved && char2Solved) {
        if (level === 3) {
          spawnFireworks(); // 觸發煙火特效
          // 延遲進入結算畫面，讓煙火播放一下
          setTimeout(() => {
            gameState = 'GAME_OVER';
          }, 2000);
        } else {
          spawnMeteors();
          setTimeout(() => {
            conquerButton.show();
            conquerButton.addClass('pop-in'); // 觸發進場動畫
          }, 1500);
        }
      }
    } else {
      // 答案錯誤，顯示答錯回饋
      dialogueText2 = currentQuestionRow.getString('答錯回饋');
      score = max(0, score - 5); // 答錯扣分，最低為0
      // 角色3顯示提示
      char3HintText = currentQuestionRow.getString('提示');
      lastAnswerCorrect = false;
      nameInput.value(''); // 清空輸入框讓玩家重試
      
      dialogueState = 3; // 進入等待狀態 (隱藏輸入框，顯示回饋)
      setTimeout(() => {
        if (dialogueState === 3) { // 確保玩家仍在互動中
          dialogueText2 = currentQuestionRow.getString('題目'); // 恢復題目
          char3HintText = ""; // 清除提示
          dialogueState = 1; // 恢復提問狀態 (顯示輸入框)
        }
      }, 2000); // 等待 2 秒
    }
  }

  // --- 角色4的回答邏輯 ---
  if (dialogueState4 === 1 && keyCode === ENTER) {
    let userAnswer = nameInput.value().trim();
    let correctAnswer = currentQuestionRow4.getString('答案');

    if (userAnswer === correctAnswer) {
      dialogueText4 = currentQuestionRow4.getString('答對回饋');
      score += 10;
      char4Solved = true; // 標記角色4已解決
      char3HintText = "";
      dialogueState4 = 2; // 答對狀態
      nameInput.value(''); // 答對後清空輸入框
    } else {
      dialogueText4 = currentQuestionRow4.getString('答錯回饋');
      score = max(0, score - 5); // 答錯扣分，最低為0
      char3HintText = currentQuestionRow4.getString('提示');
      nameInput.value(''); // 清空輸入框
      
      dialogueState4 = 3; // 進入等待狀態
      setTimeout(() => {
        if (dialogueState4 === 3) {
          dialogueText4 = currentQuestionRow4.getString('題目');
          char3HintText = "";
          dialogueState4 = 1; // 恢復提問狀態
        }
      }, 2000); // 等待 2 秒
    }
  }
}

// --- 處理滑鼠點擊 (用於開始按鈕) ---
function mousePressed() {
  if (gameState === 'START') {
    // 檢查是否點擊了紅色開始按鈕 (按鈕中心在 width/2, height/2，大小 200x80)
    if (mouseX > width / 2 - 100 && mouseX < width / 2 + 100 && mouseY > height / 2 - 40 && mouseY < height / 2 + 40) {
      startTransition('RULES');
    }
  } else if (gameState === 'RULES') {
    startTransition('NAME_INPUT');
  }
}

// --- 按鈕功能 ---
function retryQuestion() {
  // 重試同一題
  dialogueState = 1;
  dialogueText2 = currentQuestionRow.getString('題目');
  tryAgainButton.hide();
}

function askNewQuestion() {
  // 詢問一個新問題
  dialogueState = 1;
  // 從題庫隨機抽一題
  if (questionBank) {
    if (availableQuestions.length > 0) {
      currentQuestionRow = getUniqueQuestion();
      dialogueText2 = currentQuestionRow.getString('題目');
    } else {
      dialogueText2 = "題目已用完";
    }
  } else {
    dialogueText2 = "測試題目";
  }
  char3HintText = ""; // 清除提示
  nextQuestionButton.hide();
}

function draw() {
  // --- 狀態管理 ---
  if (gameState === 'START') {
    drawStartScreen();
    drawTransition();
    return;
  } else if (gameState === 'RULES') {
    drawRulesScreen();
    drawTransition();
    return;
  } else if (gameState === 'NAME_INPUT') {
    drawNameInputScreen();
    drawTransition();
    return;
  } else if (gameState === 'GAME_OVER') {
    drawGameOverScreen();
    return;
  }

  // --- 遊戲進行中 (PLAYING) ---
  // 或是獲勝狀態 (WIN)
  
  // 繪製背景
  if (level === 1) {
    if (bgImg2) image(bgImg2, 0, 0, width, height);
    else background('#dee2e6');
  } else if (level === 2) {
    if (bgImg3) image(bgImg3, 0, 0, width, height);
    else background('#2c3e50'); // 獲勝時的備用背景色
  } else if (level === 3) {
    if (bgImg4) image(bgImg4, 0, 0, width, height);
    else background('#000000');
  }
  
  // --- 繪製流星特效 ---
  drawMeteors();
  // --- 繪製煙火特效 ---
  drawFireworks();

  // --- 背景移動邏輯 (無限捲動) ---
  /* 暫時註解背景圖片繪製
  if (bgX <= -width) {
    bgX += width;
  }
  if (bgX >= width) {
    bgX -= width;
  }
  image(bgImg, bgX, 0, width, height);         // 中間的圖
  image(bgImg, bgX - width, 0, width, height); // 左邊的複製圖
  image(bgImg, bgX + width, 0, width, height); // 右邊的複製圖
  */

  // --- 繪製第三個角色 (顯示在左邊) ---
  push();
  translate(charX3, charY3);
  scale(charScale3);
  // 播放動畫 (使用 frameCount 控制速度，每 5 幀換一張圖)
  let frameIndex3 = floor(frameCount / 5) % stopAnimation3.length;
  let currentFrame3 = stopAnimation3[frameIndex3];
  // 顯示圖片並置中
  image(currentFrame3, -currentFrame3.width / 2, -currentFrame3.height / 2);
  pop();
  
  // --- 繪製第四個角色 (顯示在右邊) ---
  push();
  translate(charX4, charY4);
  scale(charScale4);
  // 播放動畫 (使用 frameCount 控制速度，每 5 幀換一張圖)
  let frameIndex4 = floor(frameCount / 5) % stopAnimation4.length;
  let currentFrame4 = stopAnimation4[frameIndex4];
  // 顯示圖片並置中
  image(currentFrame4, -currentFrame4.width / 2, -currentFrame4.height / 2);
  pop();

  // --- 角色4 互動邏輯 ---
  let d4 = dist(charX, charY, charX4, charY4);
  if (d4 < proximityThreshold && !isInProximity4 && !char4Solved) {
    isInProximity4 = true;
    dialogueState4 = 1;
    // 從題庫隨機抽一題
    if (questionBank) {
      if (availableQuestions.length > 0) {
        currentQuestionRow4 = getUniqueQuestion();
        dialogueText4 = currentQuestionRow4.getString('題目');
      } else {
        dialogueText4 = "題目已用完";
      }
    } else {
      dialogueText4 = "題目載入失敗";
    }
    nameInput.value(''); // 清空輸入框
  } else if (d4 >= proximityThreshold && isInProximity4) {
    isInProximity4 = false;
    dialogueState4 = 0;
    char3HintText = ""; // 離開時清除提示
  }

  // --- 繪製角色4的對話框 ---
  if (dialogueState4 > 0) {
    push();
    textSize(20); // 加大字體
    // 使用 targetHeight (200) 來計算高度，確保位置正確
    let textY = charY4 - targetHeight / 2 - 150; // 將文字向上移，避免被輸入框遮擋
    
    fill(255); // 改為白色文字
    stroke(0);
    strokeWeight(4); // 增加描邊確保可讀性
    textAlign(CENTER, CENTER);
    text(dialogueText4, charX4, textY);
    pop();
  }

  // --- 狀態更新 ---
  if (isJumping) {
    // --- 跳躍狀態邏輯 ---
    currentAnimation = jumpAnimation;
    
    // 更新垂直位置
    velocityY += gravity;
    charY += velocityY;

    // 播放跳躍動畫影格 (減慢播放速度)
    if (frameCount % 2 === 0 && jumpFrameIndex < jumpNumFrames - 1) { // 每 2 幀更新一次
      jumpFrameIndex++;
    }

    // 判斷是否落地
    if (charY >= originalY) {
      charY = originalY; // 修正位置到地面
      isJumping = false;
      currentAnimation = stopAnimation;
    }
  } else if (isPushing) {
    // --- 攻擊狀態邏輯 ---
    currentAnimation = pushAnimation;

    // 播放攻擊動畫影格 (減慢播放速度，使其更流暢)
    if (frameCount % 2 === 0 && pushFrameIndex < pushNumFrames - 1) { // 每 2 幀更新一次
      pushFrameIndex++;
    }

    // 動畫播放完畢
    if (pushFrameIndex >= pushNumFrames - 1) {
      isPushing = false;
    }

    // --- 攻擊命中判定 ---
    let d = dist(charX, charY, charX2, charY2);
    // 條件：在攻擊範圍內、角色2未倒下、角色1面向角色2
    if (d < attackRange && !isFalling2 && (facingDirection === 1 && charX < charX2 || facingDirection === -1 && charX > charX2)) {
      isFalling2 = true; // 標記為被擊倒
      fallDownFrameIndex2 = 0;
      // 當被攻擊時，中斷對話
      isSmiling2 = false;
      dialogueState = 0;
      isInProximity = false;
      nameInput.hide();
    }
  } else {
    // --- 非跳躍狀態 (站立/走路) 邏輯 ---
    if (keyIsDown(RIGHT_ARROW)) {
      currentAnimation = walkAnimation;
      charX += speed; // 角色1往右移動
      facingDirection = 1;
    } else if (keyIsDown(LEFT_ARROW)) {
      currentAnimation = walkAnimation;
      charX -= speed; // 角色1往左移動
      facingDirection = -1;
    } else {
      currentAnimation = stopAnimation;
    }
  }

  // 取得當前要顯示的影格
  let frameIndex;
  if (isJumping) {
    frameIndex = jumpFrameIndex;
  } else if (isPushing) {
    frameIndex = pushFrameIndex;
  } else {
    frameIndex = frameCount % currentAnimation.length;
  }
  let currentFrame = currentAnimation[frameIndex];
  
  // --- 繪製角色 ---
  push(); // 儲存當前的繪圖設定
  
  // 將座標原點移動到角色的中心點，方便進行翻轉
  translate(charX, charY);
  // 根據角色面向進行水平翻轉
  scale(facingDirection * charScale1, charScale1);

  // 顯示當前影格，並使其置中
  // frameCount 會隨時間遞增，% animation.length 確保影格索引在範圍內循環
  // 因為已經 translate 過，所以繪製在 (-width/2, -height/2) 即可達到置中效果
  image(currentFrame, -currentFrame.width / 2, -currentFrame.height / 2);

  pop(); // 恢復原本的繪圖設定

  // --- 觸發角色2的微笑動畫 ---
  // 只有當角色從範圍外進入範圍內時，才觸發一次
  // 且角色2必須是站立狀態
  // 條件新增：必須先解決角色4 (char4Solved)
  let d = dist(charX, charY, charX2, charY2);
  if (isFalling2 && d < proximityThreshold && !isPushing) {
    // 如果角色2已倒下且角色1靠近，則讓角色2恢復
    isFalling2 = false; // 恢復站立
  } else if (d < proximityThreshold && !isInProximity && !isFalling2 && char4Solved && !char2Solved) {
    isSmiling2 = true;
    smileFrameIndex2 = 0; // 重置微笑動畫
    dialogueState = 1; // 進入提問狀態
    isInProximity = true; // 標記為已在範圍內
    // --- 從題庫隨機抽一題 ---
    if (questionBank) {
      if (availableQuestions.length > 0) {
        currentQuestionRow = getUniqueQuestion();
        dialogueText2 = currentQuestionRow.getString('題目');
      } else {
        dialogueText2 = "題目已用完";
      }
    } else {
      dialogueText2 = "測試題目";
    }
  } else if (d >= proximityThreshold && isInProximity) {
    // 當角色離開範圍時，重設所有狀態
    // 如果角色2倒下，離開不會讓它恢復
    isInProximity = false;
    isSmiling2 = false;
    dialogueState = 0;
    currentQuestionRow = null; // 清除當前問題
    tryAgainButton.hide(); // 離開時隱藏按鈕
    nextQuestionButton.hide(); // 離開時隱藏按鈕
    char3HintText = ""; // 清除提示
  }

  // --- 更新角色2的面向 ---
  facingDirection2 = -1; // 強制角色2總是面向左邊

  // --- 繪製第二個角色 ---
  push();
  // 將座標原點移動到角色的中心點，方便進行翻轉
  translate(charX2, charY2);
  // 根據角色面向進行水平翻轉
  scale(facingDirection2 * charScale2, charScale2);

  let currentFrame2;
  if (isFalling2) {
    // --- 播放倒下動畫 ---
    currentFrame2 = fallDownAnimation2[fallDownFrameIndex2];
    // 每 3 幀更新一次動畫影格
    if (frameCount % 3 === 0 && fallDownFrameIndex2 < fallDownAnimation2.length - 1) {
      fallDownFrameIndex2++;
    }
  } else if (isSmiling2) {
    // --- 播放微笑動畫 ---
    // 如果在倒下恢復後馬上進入微笑，確保使用正確的動畫
    if (isFalling2) {
      isFalling2 = false;
    }

    currentFrame2 = smileAnimation2[smileFrameIndex2];
    // 每 4 幀更新一次動畫影格，讓動畫慢一點
    if (frameCount % 4 === 0) {
      smileFrameIndex2++;
    }
    // 當玩家離開範圍時，isSmiling2 會被設為 false，動畫自然停止
    if (smileFrameIndex2 >= smileAnimation2.length && dialogueState < 2) {
      isSmiling2 = false;
    }
  } else {
    // --- 播放站立動畫 ---
    let frameIndex2 = frameCount % stopAnimation2.length;
    currentFrame2 = stopAnimation2[frameIndex2];
  }
  // 顯示當前影格，並使其置中
  image(currentFrame2, -currentFrame2.width / 2, -currentFrame2.height / 2);
  pop();

  // --- 根據對話狀態顯示/隱藏 UI ---
  if (dialogueState > 0) {
    // --- 繪製角色2的對話框 ---
    push(); // 儲存繪圖設定
    textSize(20);
    let textY = charY2 - (currentFrame2.height * charScale2) / 2 - 150; // 將文字向上移，避免被輸入框遮擋
    
    fill(255); // 白色文字
    stroke(0); // 黑色邊框
    strokeWeight(4);
    textAlign(CENTER, CENTER);
    text(dialogueText2, charX2, textY);
    pop(); // 恢復繪圖設定
  }

  // --- 處理輸入框顯示位置 ---
  if (dialogueState === 1 || dialogueState4 === 1) {
    // 互動時 (角色2 或 角色4)，輸入框統一顯示在角色1 (玩家) 頭上
    nameInput.show();
    nameInput.position(charX - nameInput.width / 2, charY - (currentFrame.height * charScale1) / 2 - 80);
  } else {
    // 在任何其他狀態下都隱藏輸入框
    nameInput.hide();
  }

  // --- 處理回饋按鈕的顯示與定位 ---
  if (dialogueState === 2) {
    let boxHeight = 40;
    let btnY = charY2 - (currentFrame2.height * charScale2) / 2 - boxHeight - 10 - 35; // 對話框上方
    if (lastAnswerCorrect) {
      if (!char4Solved || !char2Solved) {
        nextQuestionButton.show();
        nextQuestionButton.position(charX2 - nextQuestionButton.width / 2, btnY);
      }
    }
    // 答錯時不再顯示 tryAgainButton，因為輸入框會一直存在直到答對
  }

  // --- 繪製角色3的提示文字 (答錯時顯示) ---
  if (char3HintText !== "") {
    push();
    textSize(18);
    fill(255, 255, 0); // 黃色文字
    stroke(0);
    strokeWeight(3);
    textAlign(CENTER, BOTTOM);
    // 顯示在角色3頭上
    text(char3HintText, charX3, charY3 - (stopSpriteHeight3 * charScale3) / 2 - 20);
    pop();
  }

  // --- 繪製 HUD (抬頭顯示器) ---
  drawHUD();
  
  // --- 繪製轉場特效 (如果在轉場中) ---
  drawTransition();
}

// --- 自定義函式：繪製開始畫面 ---
function drawStartScreen() {
  background('#1a1a2e'); // 深色太空背景
  
  // 繪製靜態星空背景 (使用數學運算代替 random 以保持位置固定)
  push();
  fill(255);
  noStroke();
  for(let i=0; i<50; i++) {
    let x = (i * 137) % width;
    let y = (i * 311) % height;
    let s = (i % 3) + 2;
    ellipse(x, y, s, s);
  }
  pop();

  // 標題：星球攻略戰 (復古 2D 風格)
  push();
  textAlign(CENTER, CENTER);
  textSize(80);
  textStyle(BOLD);
  
  // 標題陰影層
  fill(0);
  text("星球攻略戰", width / 2 + 6, height / 2 - 120 + 6);
  
  // 標題裝飾層
  fill(200, 50, 50);
  text("星球攻略戰", width / 2 + 3, height / 2 - 120 + 3);
  
  // 標題主體層
  fill(255, 215, 0); // 金色
  stroke(0);
  strokeWeight(5);
  text("星球攻略戰", width / 2, height / 2 - 120);
  pop();
  
  // 繪製紅色開始按鈕
  rectMode(CENTER);
  
  // 按鈕陰影
  fill(0, 0, 0, 150);
  noStroke();
  rect(width / 2 + 5, height / 2 + 5, 200, 80, 10);

  // 按鈕本體
  fill(220, 20, 60); // 復古紅
  stroke(255);
  strokeWeight(4);
  rect(width / 2, height / 2, 200, 80, 10); // 圓角矩形
  
  // 按鈕文字
  push();
  fill(255);
  noStroke();
  textSize(32);
  textStyle(BOLD);
  textAlign(CENTER, CENTER);
  // 文字陰影
  drawingContext.shadowOffsetX = 2;
  drawingContext.shadowOffsetY = 2;
  drawingContext.shadowColor = 'black';
  text("開始遊戲", width / 2, height / 2);
  pop();
  
  // 重置 Context
  drawingContext.shadowOffsetX = 0;
  drawingContext.shadowOffsetY = 0;
  drawingContext.shadowColor = 'transparent';
}

// --- 自定義函式：繪製遊戲規則畫面 ---
function drawRulesScreen() {
  background(0); // 全黑背景

  push();
  // 標題特效
  textAlign(CENTER, CENTER);
  textSize(60);
  textStyle(BOLD);
  
  // 改用清晰的描邊風格，移除模糊發光
  stroke(180, 40, 40); // 深紅色描邊，對比清晰
  strokeWeight(8);
  fill(255, 215, 0); // 金色
  text("遊戲規則", width / 2, height / 2 - 220);

  // 規則內容
  textSize(28);
  textStyle(NORMAL);
  fill(255);
  
  textAlign(CENTER, TOP);
  text("親愛的攻略者們，歡迎來到星球攻略戰", width / 2, height / 2 - 140);

  textAlign(LEFT, TOP);
  let startX = width / 2 - 320;
  let startY = height / 2 - 80;
  let lineHeight = 50;

  text("1. 玩家利用鍵盤左右方向鍵進行左右移動", startX, startY);
  text("2. 請先跟藍衣男子進行問答，答對後再跟白衣男子進行問答", startX, startY + lineHeight);
  text("3. 答對一題加10分，答錯一題扣5分", startX, startY + lineHeight * 2);
  text("4. 問答結束後，才能進到下一關", startX, startY + lineHeight * 3);
  text("5. 總共三關，祝你順利!", startX, startY + lineHeight * 4);

  // 點擊提示
  textAlign(CENTER, BOTTOM);
  textSize(20);
  fill(150);
  if (frameCount % 60 < 30) { // 閃爍效果
    text("- 點擊畫面繼續 -", width / 2, height - 50);
  }
  pop();
}

// --- 自定義函式：繪製姓名輸入畫面 ---
function drawNameInputScreen() {
  // 背景
  if (bgImg2) image(bgImg2, 0, 0, width, height);
  else background('#555');

  // 半透明遮罩框
  rectMode(CENTER);
  fill(0, 0, 0, 150);
  noStroke();
  rect(width / 2, height / 2, 400, 200, 20);

  // 提示文字
  fill(255);
  textSize(24);
  textAlign(CENTER, CENTER);
  text("請輸入您的名字", width / 2, height / 2 - 50);
  textSize(16);
  text("(按下 Enter 開始)", width / 2, height / 2 + 60);
}

// --- 自定義函式：繪製 HUD ---
function drawHUD() {
  push();
  fill(255);
  stroke(0);
  strokeWeight(2);
  textSize(24);
  textAlign(RIGHT, TOP);
  text(`玩家: ${playerName}`, width - 20, 20);
  text(`分數: ${score}`, width - 20, 50);
  pop();
}

// --- 自定義函式：處理轉場邏輯與繪製 ---
function startTransition(targetState) {
  transitionMode = 'OUT'; // 開始淡出 (變黑)
  nextState = targetState;
}

function drawTransition() {
  if (transitionMode === 'NONE') return;

  if (transitionMode === 'OUT') {
    transitionAlpha += 15; // 漸變速度
    if (transitionAlpha >= 255) {
      transitionAlpha = 255;
      transitionMode = 'IN'; // 切換到淡入
      gameState = nextState; // 切換狀態
      
      // 狀態切換時的初始化邏輯
      if (gameState === 'NAME_INPUT') {
        startNameInput.value(''); // 進入輸入畫面時，清空之前的輸入內容
        startNameInput.show();
        startNameInput.position(width / 2 - 100, height / 2);
      } else if (gameState === 'PLAYING') {
        startNameInput.hide();
        playerName = startNameInput.value() || "玩家1"; // 取得名字，若空則預設為中文
      } else if (gameState === 'LEVEL_2') {
        level = 2;
        gameState = 'PLAYING';
        nameInput.hide(); // 確保輸入框隱藏
        
        // 重置關卡狀態
        char4Solved = false;
        char2Solved = false;
        dialogueState = 0;
        dialogueState4 = 0;
        char3HintText = "";
        
        // 重置角色位置
        charX = width * 0.85;
        charY = height / 2;
        charX2 = width * 0.6;
        charY2 = height / 2;
        charX3 = width * 0.15;
        charY3 = height / 2;
        charX4 = width * 0.4;
        charY4 = height / 2;
      } else if (gameState === 'LEVEL_3') {
        // 進入第三關的初始化邏輯
        level = 3;
        gameState = 'PLAYING';
        nameInput.hide(); // 確保輸入框隱藏
        
        // 重置關卡狀態 (重複 orig_big_2.png 時的動作)
        char4Solved = false;
        char2Solved = false;
        dialogueState = 0;
        dialogueState4 = 0;
        char3HintText = "";
        
        // 重置角色位置
        charX = width * 0.85;
        charY = height / 2;
        charX2 = width * 0.6;
        charY2 = height / 2;
        charX3 = width * 0.15;
        charY3 = height / 2;
        charX4 = width * 0.4;
        charY4 = height / 2;
      }
    }
  } else if (transitionMode === 'IN') {
    transitionAlpha -= 15;
    if (transitionAlpha <= 0) {
      transitionAlpha = 0;
      transitionMode = 'NONE'; // 轉場結束
    }
  }

  // 繪製全螢幕黑色遮罩
  push();
  fill(0, 0, 0, transitionAlpha);
  noStroke();
  rectMode(CORNER);
  rect(0, 0, width, height);
  pop();
}

// --- 自定義函式：生成流星 ---
function spawnMeteors() {
  meteors = [];
  for (let i = 0; i < 30; i++) {
    meteors.push({
      x: random(width, width + 800),
      y: random(-200, height / 2),
      size: random(2, 5),
      speed: random(25, 45),
      length: random(50, 150)
    });
  }
}

// --- 自定義函式：繪製流星 ---
function drawMeteors() {
  for (let i = meteors.length - 1; i >= 0; i--) {
    let m = meteors[i];
    m.x -= m.speed;
    m.y += m.speed * 0.5; // 斜向移動
    
    stroke(255, 255, 200, 200);
    strokeWeight(m.size);
    line(m.x, m.y, m.x + m.length, m.y - m.length * 0.5);
    
    if (m.x < -200 || m.y > height + 200) {
      meteors.splice(i, 1);
    }
  }
}

// --- 自定義函式：生成煙火 ---
function spawnFireworks() {
  for (let i = 0; i < 8; i++) { // 產生 8 個煙火爆炸點
    let cx = random(width * 0.2, width * 0.8);
    let cy = random(height * 0.2, height * 0.6);
    let color = [random(100, 255), random(100, 255), random(100, 255)];
    for (let j = 0; j < 60; j++) { // 每個爆炸點 60 個粒子
      fireworks.push({
        x: cx,
        y: cy,
        vx: random(-6, 6),
        vy: random(-6, 6),
        alpha: 255,
        color: color
      });
    }
  }
}

// --- 自定義函式：繪製煙火 ---
function drawFireworks() {
  for (let i = fireworks.length - 1; i >= 0; i--) {
    let f = fireworks[i];
    f.x += f.vx;
    f.y += f.vy;
    f.vy += 0.15; // 重力效果
    f.alpha -= 4; // 漸漸消失
    
    noStroke();
    fill(f.color[0], f.color[1], f.color[2], f.alpha);
    ellipse(f.x, f.y, 5, 5);
    
    if (f.alpha <= 0) {
      fireworks.splice(i, 1);
    }
  }
}

// --- 自定義函式：繪製遊戲結束畫面 ---
function drawGameOverScreen() {
  // 繪製第三關背景
  if (bgImg4) image(bgImg4, 0, 0, width, height);
  else background(0);
  
  // 背景變暗 (半透明黑色遮罩)
  fill(0, 200);
  noStroke();
  rectMode(CORNER);
  rect(0, 0, width, height);
  
  // 繼續繪製煙火 (如果還有的話)
  drawFireworks();

  // 顯示玩家名字與最終分數
  textAlign(CENTER, CENTER);
  fill(255);
  stroke(0);
  strokeWeight(4);
  
  textSize(60);
  text("最終分數: " + score, width / 2, height / 2 - 50);
  
  // 根據分數顯示不同訊息與特效
  if (score >= 60) {
    // 攻略銀河系成功 - 閃爍光芒特效
    let glowAmount = 20 + 15 * sin(frameCount * 0.1); // 呼吸燈效果
    drawingContext.shadowBlur = glowAmount;
    drawingContext.shadowColor = 'cyan';
    fill(200, 255, 255);
    textSize(50);
    text("攻略銀河系成功", width / 2, height / 2 + 50);
    drawingContext.shadowBlur = 0; // 重置特效以免影響其他繪圖
  } else {
    // 後會有期 - 頹廢特效 (灰色、顫抖)
    fill(150); // 灰色
    textSize(50);
    let shakeX = random(-2, 2);
    let shakeY = random(-2, 2);
    text("後會有期", width / 2 + shakeX, height / 2 + 50 + shakeY);
  }
}
