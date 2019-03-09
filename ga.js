function getRandom(min,max){
    return Math.floor(Math.random()*(max-min+1))+min;
  };
  var wheel;
  var wheelSum = 0;
  var wheelChoose = [];
  var chooseBit = 0;
  var chooseBitTemp = [];
  var minOne = 9999;
  var minTwo = 9999;
  var minOneIndex;
  var minTwoIndex;
  var randmutation = 0.3;
  var mutationRanBit = 0;
  var mutationRanBit2 = 0;
  var temp2 = [];
  
  
  function ga(iteration,countTime, savedtemp){
    // console.log(savedtemp);
    // 創造染色體
    // console.log(solutionNum[0]);
    // 計算1的數量->計算得分
  
   for (let i = 0; i < birdNum; i++)
    {
      for (let j = 0; j < birdLength; j++)
      {
        if(solutionNum[i][j] == 1 && iteration == 0)
        {
          oneNum[i]++;
        }
      }
      if(iteration > 0)
      {
        oneNum[savedtemp[i]] = savedBirds[i].point;
      }
      // console.log(oneNum[i]);
    } 
    // 選兩個最爛的1
    for (let cp = 0; cp < birdNum; cp++)
    {
      if(oneNum[cp] < minOne)
      {
        minOne = oneNum[cp];
        minOneIndex = cp;
      }
    }
    // 選兩個最爛的2
    for (let cp = 0; cp < birdNum; cp++)
    {
      if(oneNum[cp] < minTwo && oneNum[cp] > minOne)
      {
        minTwo = oneNum[cp];
        minTwoIndex = cp;
      }
    }
  
    // 排序十組
    if( iteration ==  0)
    {
      for (let i = 0; i < birdNum; i++)
      {
        maxOne = 0;
        for(let j = 0; j < birdNum; j++)
        {
          if (oneNum[j] > maxOne)
          {
            maxOne = oneNum[j];
            maxIndex = j;
          }
        }
        oneNum[maxIndex] = 0;
        // temp == 排序完十組
        temp[i] = solutionNum[maxIndex];
      }
    }
  
    // 排序分數 第二代後執行
    if( iteration > 0)
    {
      for (let i = 0; i < birdNum; i++)
      {
        maxOne = 0;
        for(let j = 0; j < birdNum; j++)
        {
          if (oneNum[j] > maxOne)
          {
            maxOne = oneNum[j];
            maxIndex = j;
          }
        }
        // temp == 排序完十組
        temp2[i] = oneNum[maxIndex];
        oneNum[maxIndex] = 0;
      }
    }
  
  
  
  
    // 重算temp 內的 基因1的個數
    for (let i = 0; i < birdNum; i++)
    {
      for (let j = 0; j < birdLength; j++)
      {
        if(temp[i][j] == 1 && iteration == 0)
        {
          oneNum[i]++;
        }
      }
      if(iteration > 0)
      {
        oneNum[i] = temp2[i];
      }
      // console.log(oneNum[i]);
    }
  
  
  
    // 給十組權重 = weightArr
    weightSum = 0;
    for (let i = 0; i < birdNum; i++)
    {
      if(iteration == 0)
      {
        weightArr[i] = (1000000 - 10000*i) * (oneNum[i] / 10);
        weightSum = weightSum + weightArr[i];
      }
      else
      {
        weightArr[i] = (30 - 2*i) * 10 * oneNum[i];
        if((30 - 2 * i) > 0)
        {
          weightSum = weightSum + weightArr[i];
        }
        else
        {
          weightArr[i] = 1;
        }
      }
    }
  
    for (let i = 0; i < birdNum; i++)  
    {
      proArr[i] = weightArr[i] / weightSum;
    }
  
    
    // 輪盤 選兩組出來
    for (var kW = 0; kW < 2; kW++)
    {
      wheel = Math.random(0, 1);
      // console.log(wheel);
      
      for (var jW = 0; wheel > 0; jW++)
      {
        wheel = wheel - proArr[jW];
      }
      // console.log(jW - 1);
      if(iteration == 0)
      {
        wheelChoose[kW] = temp[jW - 1];
      }
      else
      {
        wheelChoose[kW] = temp2[jW - 1];
      }
      // console.log(jW);
    }
    // chooseBit 後面的 做crossover 
    // chooseBit = getRandom(0, birdLength - 1);
    chooseBit = getRandom(countTime-60, countTime);
    if(iteration == 0)
    {
      wheelChoose[2] = temp[2];
    }
    else
    {
      wheelChoose[2] = temp2[2];
    }
    
    
    for (let x = chooseBit; x < birdLength; x++)
    {
        wheelChoose[2][x] = wheelChoose[0][x];
        wheelChoose[0][x] = wheelChoose[1][x];
        wheelChoose[1][x] = wheelChoose[2][x];
    }
    // console.log(chooseBitTemp);
  
    // 塞回最爛的兩個
    solutionNum[minOneIndex] = wheelChoose[0];
    solutionNum[minTwoIndex] = wheelChoose[1];  
    
  
    // mutation 
    for (let randx = 0; randx < birdNum /*&& randx > countTime - 50*/; randx++)
    {
      //if(randmutation > Math.random()) <-- 必定mutation
      {
        // 變 20 個bits
          mutationRanBit = getRandom(countTime-40, countTime);
          mutationRanBit2 = getRandom(0, 2);
          for (let randy = 0; randy < 10; randy++)
          {
            solutionNum[randx][mutationRanBit + randy] = mutationRanBit2;
          }
  
      }
    }
  }