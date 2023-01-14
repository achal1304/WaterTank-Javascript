function computeWallAndWater() {
    let fromElement = document.getElementById('inputArr');
    let inputArr = fromElement.value.split(',')
    showBricksAndWater(inputArr)
    showOnlyWater(inputArr)
}

const waterSum = (waterLevels) => {
    let sum = 0;
    for (let i = 0; i < waterLevels.length; i++) {
        let element = waterLevels[i];
        if (element != '-') {
            sum += +element;
        }
    };

    return sum;
};

function createChartTable(xAxisNamesArr, outputArr, waterArr, id) {
    console.log("output",outputArr)
    console.log("outputwater",waterArr)
    let dom = document.getElementById(id);
    let myChart = echarts.init(dom, {
        renderer: 'canvas',
        useDirtyRect: false,
    });

    option = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        legend: {},
        grid: {
            containLabel: true
        },
        xAxis: [
            {
                type: 'category',
                data: xAxisNamesArr
            }
        ],
        yAxis: [
            {
                type: 'value'
            }
        ],
        series: [
            {
                name: 'Bricks',
                type: 'bar',
                stack: 'Ad',
                color: '#FFFF00',
                emphasis: {
                    focus: 'series'
                },
                data: outputArr,
                barCategoryGap: '0%'
            },
            {
                name: 'Water',
                type: 'bar',
                stack: 'Ad',
                color:'#0000FF',
                emphasis: {
                    focus: 'series'
                },
                data: waterArr,
                barCategoryGap: '0%'

            },
        ]
    };

    if (option && typeof option === 'object') {
        myChart.setOption(option);
    }
    window.addEventListener('resize', myChart.resize);
  
}


function showBricksAndWater(bricks) {
    let resultWater = []
    let resultBricks = []
    let waterLevels = waterLevel(bricks)

    for (let i = 0; i < bricks.length; i++) {
        let water = waterLevels[i]
        let brick = bricks[i]
        resultWater.push({
            value: water,
            itemStyle: {
                color: '#0000FF'
            }
        })
        resultBricks.push({
            value: brick,
            itemStyle: {
                color: '#FFFF00'
            }
        })
    }

    createChartTable(bricks, resultBricks, resultWater, 'chart-container')
}


function waterLevel(bricksArr) {
    let waterLevels = []
    let minimumWaterLevel = []
    minimumWaterLevel[0] = bricksArr[0]
    let maximumWaterLevel = []
    maximumWaterLevel[bricksArr.length-1] = bricksArr[bricksArr.length-1]
    for (let i = 1; i < bricksArr.length; i++) {
        
        let brick = bricksArr[i]
        minimumWaterLevel[i] = (minimumWaterLevel[i-1] > bricksArr[i]) ? minimumWaterLevel[i-1] : bricksArr[i]
    }
    console.log(minimumWaterLevel)
    for (let i = bricksArr.length-2; i >= 0; i--) {
        let brick = bricksArr[i]
        maximumWaterLevel[i] = (maximumWaterLevel[i+1] > bricksArr[i]) ? maximumWaterLevel[i+1] : bricksArr[i]
    }
    console.log(maximumWaterLevel)

    for (let i = 0; i < bricksArr.length; i++) {
        let brick = bricksArr[i]
        waterLevels[i] = ((minimumWaterLevel[i] < maximumWaterLevel[i]) ? minimumWaterLevel[i] : maximumWaterLevel[i]) - brick

    }
    return waterLevels
}

function showOnlyWater(bricks) {
    let waterLevels = []
    let resultWater = []
    let resultBricks = []

    waterLevels = waterLevel(bricks)
    for (let i = 0; i < bricks.length; i++) {
        let waterWall = waterLevels[i]
        let brick = bricks[i]
        resultWater.push({
            value: waterWall,
            itemStyle: {
                color: '#0000FF'
            }
        })
        resultBricks.push({
            value: brick,
            itemStyle: {
                color: 'transparent'
            }
        })
    }

    createChartTable(bricks, resultBricks, resultWater, 'chart-container1')

    let outputspan = document.getElementById('waterunit')
    outputspan.innerHTML = `Total water unit ${waterSum(waterLevels)}`
}


