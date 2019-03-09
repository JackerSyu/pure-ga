// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/cXgA1d_E-jY&


var bird;
var birds = [];
var pipes = [];
var coins = [];
var oneNum = [];
var proArr = [];
var weightArr = [];
var temp = [];
var maxOne = 0;
var maxIndex = 0;
var weightSum = 0;
var maxPoint = 0;
var maxPointIndex = 0;
var j = 0;
var k = 0;
// var mapPipe = [];
var index;

var count = 0;

var randP;
var testset = 10;
/////////////////////////////////////////////////////////
var birdNum = 30;
var birdLength = 10000;
// 建立二維陣列 solutionNum  鳥->【10】 基因->【1000】
var solutionNum = new Array(birdNum);

var flag = 0;
for (let i = 0 ; i < birdNum ; i++) {
  solutionNum[i] = new Array(birdLength);
}
// 初始1數量
for (let i = 0; i < birdNum; i++)
{
  oneNum[i] = 0;
}

var slider;

function setup() {
  frameRate(60);
  createCanvas(640, 240);
  for (let i = 0; i < birdNum; i++)
  {
    birds[i] = new Bird(i);
  }
  // 創造十組 基因
  for (var ii = 0; ii < birdNum; ii++)
  {
    for (var jj = 0; jj < birdLength; jj++)
    {
      solutionNum[ii][jj] = getRandom(0, 2);
    }
    birds[ii].path(solutionNum[ii]);
    
  }

  // pipes.push(new Pipe());
  slider = createSlider(1, 50, 1);
  textSize(30);
  textAlign();
}

var pipeScore = [];
for (let birdIndex = 0; birdIndex < birdNum; birdIndex++)
{
  pipeScore[birdIndex] = 0;
}

var savedBirds = [];
var savedtemp = [];
var saveIndex = 0;
var countTime = 0;
var iteration = 0;
var st = 0;
var st2 = 0;
/////////////////////////////////////////////////////////////////////// draw ///////////////////////////////////////////////////////////////////////////////////////////////
function draw() {
  background(0);

  for (let n = 0; n < slider.value(); n++)
  {
    
    countTime++;
    text(countTime, width / 2, height / 2);
  
    for (var i = pipes.length-1; i >= 0; i--) {
      pipes[i].update();
      // st = 0;
      for (let birdIndex = birds.length - 1; birdIndex >= 0; birdIndex--)
      {   
        if (pipes[i].hits(birds[birdIndex]) || countTime == birdLength)
        // if (pipes[i].hits(bird) || countTime == birdLength)
        {
          birds[birdIndex].passPoint(countTime);
          // savedtemp[st] = birdIndex;
          // console.log(st);
          savedtemp[st2] = birds[birdIndex].indexBird;
          // console.log(savedtemp[st2]);
          savedBirds.push(birds.splice(birdIndex, 1)[0]);
          // savedBirds[birdIndex] = birds[birdIndex];
          // birds.splice(birdIndex, 1);
        }
        st2++;
      }
      // for (let sj = birds.length - 1; sj >= 0; sj--) {
      //   if (pipes[i].hits(birds[sj])) {
      //     savedBirds.push(birds.splice(sj, 1)[0]);
      //   }
      // }
    }

    for (var i = coins.length-1; i >= 0; i--) {
  
      coins[i].update();
      
      for (let birdIndex = birds.length - 1; birdIndex >= 0; birdIndex--)
      {
        if (coins[i].hits(birds[birdIndex])) 
        {
          birds[birdIndex].coinPoint();
          // console.log("SCORE");
        }
      }
      // if (pipes[i].offscreen()) {
      // pipes.splice(i, 1);
      // }
    }
    for (let bird of birds)
    {
      bird.update();
    }
  
    if (countTime % 100 == 0 && countTime <= 10000) {
      pipes.push(new Pipe(indexTop[j], indexBottom[j]));
      j++;
    //   indexTop[count] = index.top;
    //   indexBottom[count] = index.bottom;
    //   count++;
    }

    if (countTime % 100 != 0 && countTime <= 10000 && countTime % 10 == 0) {
      coins.push(new Coin(coinY[k]));
      k++;
      // coinY.push(index.top);
    //   indexTop[count] = index.top;
    //   indexBottom[count] = index.bottom;
    //   count++;
    }
    
   for(let bird of birds)
   {
    if (bird.pathArr[countTime + 0] == 1 && bird.pathArr[countTime + 1] == 1 && bird.y == 240 && flag == 0) 
    {
      bird.up();
      // console.log(countTime);
      // testset = testset + 20;
      // if (bird.pathArr[countTime + 3] == 1) 
      // {
      //   bird.up();
      //   // testset = testset + 20;
      // }
      flag++;
    }  
    if(bird.pathArr[countTime + 2] == 2 && bird.pathArr[countTime + 3] == 2 && bird.y > 220 && flag == 1)
    {
      bird.up();
      flag = 0;
    }
    flag = 0;
 
   } 
   // 死掉 ////////////////////////////////////
   if(birds.length == 0 || countTime == birdLength)
   {
     
      // if(iteration == 300)
      {
        for(let i = 0; i < birdNum; i++)
        {
          if(savedBirds[i].point > maxPoint)
          {
          maxPoint = savedBirds[i].point;
          maxPointIndex = i;
          }
        }
      console.log("Generations = " + iteration +" Coins = " + savedBirds[maxPointIndex].coinPointSum +" Distance = "  + savedBirds[maxPointIndex].frameCountScore + " Total Score = " + (savedBirds[maxPointIndex].frameCountScore + savedBirds[maxPointIndex].coinPointSum));
      document.getElementById("test").innerHTML = "Generations = " + iteration + "<br>"+ "<br>" +"Coins = " + savedBirds[maxPointIndex].coinPointSum + "<br>"+ "<br>" +" Distance = "  + savedBirds[maxPointIndex].frameCountScore + "<br>"+ "<br>"+ " Total Score = " + (savedBirds[maxPointIndex].frameCountScore + savedBirds[maxPointIndex].coinPointSum);
      }
      
    
      j = 0;
      k = 0;
      //testset = 10;
      coins.splice(0, coins.length);
      pipes.splice(0, pipes.length);
    
      ga(iteration,countTime, savedtemp); 
      countTime = 0;
      savedBirds = [];
      savedtemp = [];
      st = 0;
      st2 = 0;
      maxPoint = 0;
      maxPointIndex = 0;
      for (let i = 0; i < birdNum; i++)
      {
        birds[i] = new Bird(i);
        birds[i].path(solutionNum[i]);
      }
      iteration++;
   }
  }
  
  // text(frameCount, width / 2, height / 2);
  for (var i = pipes.length-1; i >= 0; i--) 
  {
    pipes[i].show();
  }
  for (var i = coins.length-1; i >= 0; i--) 
  {
    coins[i].show();
  }
  for (let bird of birds)
  {
    bird.show();
  }
}










