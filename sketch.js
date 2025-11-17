let spritesheet;
let frames = []; // 用於儲存動畫的每一格圖片
let spritesheet2; // 第二個角色的圖片精靈
let frames2 = []; // 儲存第二個角色動畫的陣列
let currentFrame = 0; // 當前播放的影格索引
let isPlaying = false; // 動畫是否正在播放的狀態旗標

let sound; // 用於儲存音樂檔案的變數
let amplitude; // 用於分析音樂振幅的 p5.Amplitude 物件
let minFrameRate = 5; // 動畫的最低影格率
let maxFrameRate = 30; // 動畫的最高影格率

const frameCountTotal = 8; // 精靈圖中有8張圖片
const frameWidth = 483 / frameCountTotal; // 計算單一影格的寬度
const frameHeight = 55; // 影格的高度

// 第二個角色的常數
const frameCountTotal2 = 7; // 第二個精靈圖中有7張圖片
const frameWidth2 = 401 / frameCountTotal2; // 計算第二個角色單一影格的寬度
const frameHeight2 = 55; // 第二個角色影格的高度

// 在 sketch 開始前預先載入資源
function preload() {
  // 載入您的連續圖片精靈
  // 請確保路徑 '1/all.png' 是正確的
  spritesheet = loadImage('1/all.png');
  spritesheet2 = loadImage('2/all.png');
  // 載入建議的音樂檔案
  // 確保音樂檔案存在於 'music' 資料夾中
  sound = loadSound('music/Club Love - Everet Almond.mp3');
}

// 此函式只會在程式開始時執行一次
function setup() {
  // 建立一個填滿整個視窗的畫布
  createCanvas(windowWidth, windowHeight);

  // 使用 for 迴圈切割 spritesheet，並將每一格存入 frames 陣列
  for (let i = 0; i < frameCountTotal; i++) {
    // 使用 get() 方法從 spritesheet 中擷取一個矩形區域的像素
    let frameImage = spritesheet.get(i * frameWidth, 0, frameWidth, frameHeight);
    frames.push(frameImage);
  }

  // 切割第二個角色的 spritesheet
  for (let i = 0; i < frameCountTotal2; i++) {
    let frameImage = spritesheet2.get(i * frameWidth2, 0, frameWidth2, frameHeight2);
    frames2.push(frameImage);
  }

  // 初始化 p5.Amplitude 物件並將其輸入連接到音樂檔案
  amplitude = new p5.Amplitude();
  amplitude.setInput(sound);
  
  // 將圖片的繪製模式設定為中心點對齊
  imageMode(CENTER);
  // 初始設定動畫的播放速度，實際速度將由音樂振幅在 draw() 中動態調整
  frameRate(minFrameRate);
}

// 此函式會不斷重複執行，繪製畫面
function draw() {
  // 將畫布背景設定為指定的顏色
  background('#57886C');

  // 取得當前音樂的振幅等級 (值介於 0 到 1 之間)
  let level = amplitude.getLevel();
  // 將振幅等級映射到預設的影格率範圍，使動畫速度隨音樂大小聲變化
  let mappedFrameRate = map(level, 0, 1, minFrameRate, maxFrameRate);
  frameRate(mappedFrameRate); // 設定新的影格率
  // 計算兩個角色的影格索引
  const frameIndex1 = currentFrame % frameCountTotal;
  const frameIndex2 = currentFrame % frameCountTotal2;

  // 顯示第一個角色的當前影格，位置在畫布中央的左邊
  image(frames[frameIndex1], windowWidth / 2 - frameWidth, windowHeight / 2);

  // 顯示第二個角色的當前影格，位置在畫布中央的右邊
  image(frames2[frameIndex2], windowWidth / 2 + frameWidth2, windowHeight / 2);

  // 如果 isPlaying 為 true，則更新 currentFrame 以播放下一個影格
  if (isPlaying) {
    // 增加影格計數器
    currentFrame++;
  }
}

// 當滑鼠被按下時，此函式會被呼叫
function mousePressed() {
  // 切換音樂的播放/暫停狀態
  if (sound.isPlaying()) {
    sound.pause();
  } else {
    sound.loop(); // 使用 loop() 讓音樂循環播放
  }
  // 切換 isPlaying 的布林值 (true -> false, false -> true)
  isPlaying = !isPlaying;
}
