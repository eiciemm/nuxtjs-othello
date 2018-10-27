export const state = () => {
    return {
        cellData : [
            0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 1, -1, 0, 0, 0,
            0, 0, 0, -1, 1, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0
        ],
    }
}

export const getters = {
    getScore: (state) => {
        let black = 0
        let white = 0
        for (let i = 0; i < state.cellData.length; i++) {
            if(state.cellData[i] == -1){
                black += 1
            }else if(state.cellData[i] == 1){
                white += 1
            }
        }
        return [black, white]
    }
}

export const mutations = {
    // 右方向の処理
    right(state, stoneData){
        const newCellData = [...state.cellData]
        if(stoneData[1] - stoneData[0] == 1){ //1枚だけの場合

            if(newCellData[stoneData[1]] == 1){ //手が黒 1(wh) → -1(bl)
                newCellData[stoneData[0]] = -1
                newCellData[stoneData[1]] = -1

            }else if(newCellData[stoneData[1]] == -1){ //手が白 -1(bl) → 1(wh)
                newCellData[stoneData[0]] = 1
                newCellData[stoneData[1]] = 1
            }

        }else if(stoneData[1] - stoneData[0] > 1){ //複数枚の場合
            let start = stoneData[0]
            let end = stoneData[1]
            if(newCellData[end] == 1){ //手が黒 1(wh) → -1(bl)
                while(start <= end){
                    newCellData[start] = -1
                    start += 1
                }
            }else if(newCellData[end] == -1){ //手が白 -1(bl) → 1(wh)
                while(start <= end){
                    newCellData[start] = 1
                    start += 1
                }
            }
        }
        state.cellData=newCellData
    },

    // 左方向の処理
    left(state, stoneData){
        const newCellData = [...state.cellData]
        if(stoneData[0] - stoneData[1] == 1){ //1枚だけの場合

            if(newCellData[stoneData[1]] == 1){ //手が黒 1(wh) → -1(bl)
                newCellData[stoneData[0]] = -1
                newCellData[stoneData[1]] = -1

            }else if(newCellData[stoneData[1]] == -1){ //手が白 -1(bl) → 1(wh)
                newCellData[stoneData[0]] = 1
                newCellData[stoneData[1]] = 1
            }

        }else if(stoneData[0] - stoneData[1] > 1){ //複数枚の場合
            let start = stoneData[0]
            let end = stoneData[1]
            if(newCellData[end] == 1){ //手が黒 1(wh) → -1(bl)
                while(start >= end){
                    newCellData[start] = -1
                    start -= 1
                }
            }else if(newCellData[end] == -1){ //手が白 -1(bl) → 1(wh)
                while(start >= end){
                    newCellData[start] = 1
                    start -= 1
                }
            }
        }
        state.cellData=newCellData
    },

    //上方向の処理
    top(state, stoneData){
        const newCellData = [...state.cellData]
        if(stoneData[0] - stoneData[1] == 8){ //1枚だけの場合

            if(newCellData[stoneData[1]] == 1){ //手が黒 1(wh) → -1(bl)
                newCellData[stoneData[0]] = -1
                newCellData[stoneData[1]] = -1

            }else if(newCellData[stoneData[1]] == -1){ //手が白 -1(bl) → 1(wh)
                newCellData[stoneData[0]] = 1
                newCellData[stoneData[1]] = 1
            }

        }else if(stoneData[0] - stoneData[1] > 8){ //複数枚の場合
            let start = stoneData[0]
            let end = stoneData[1]

            if(newCellData[end] == 1){ //手が黒 1(wh) → -1(bl)
                while(start >= end){
                    newCellData[start] = -1
                    start -= 8
                }
            }else if(newCellData[end] == -1){ //手が白 -1(bl) → 1(wh)
                while(start >= end){
                    newCellData[start] = 1
                    start -= 8
                }
            }
        }
        state.cellData=newCellData
    },

    //下方向の処理
    bottom(state, stoneData){
        const newCellData = [...state.cellData]
        if(stoneData[1] - stoneData[0] == 8){ //1枚だけの場合

            if(newCellData[stoneData[1]] == 1){ //手が黒 1(wh) → -1(bl)
                newCellData[stoneData[0]] = -1
                newCellData[stoneData[1]] = -1

            }else if(newCellData[stoneData[1]] == -1){ //手が白 -1(bl) → 1(wh)
                newCellData[stoneData[0]] = 1
                newCellData[stoneData[1]] = 1
            }

        }else if(stoneData[1] - stoneData[0] > 8){ //複数枚の場合
            let start = stoneData[0]
            let end = stoneData[1]

            if(newCellData[end] == 1){ //手が黒 1(wh) → -1(bl)
                while(start <= end){
                    newCellData[start] = -1
                    start += 8
                }
            }else if(newCellData[end] == -1){ //手が白 -1(bl) → 1(wh)
                while(start <= end){
                    newCellData[start] = 1
                    start += 8
                }
            }
        }
        state.cellData=newCellData
    },

    //左上方向の処理
    topLeft(state, stoneData){
        const newCellData = [...state.cellData]
        if(stoneData[0] - stoneData[1] == 9){ //1枚だけの場合

            if(newCellData[stoneData[1]] == 1){ //手が黒 1(wh) → -1(bl)
                newCellData[stoneData[0]] = -1
                newCellData[stoneData[1]] = -1

            }else if(newCellData[stoneData[1]] == -1){ //手が白 -1(bl) → 1(wh)
                newCellData[stoneData[0]] = 1
                newCellData[stoneData[1]] = 1
            }

        }else if(stoneData[0] - stoneData[1] > 9){ //複数枚の場合
            let start = stoneData[0]
            let end = stoneData[1]

            if(newCellData[end] == 1){ //手が黒 1(wh) → -1(bl)
                while(start >= end){
                    newCellData[start] = -1
                    start -= 9
                }
            }else if(newCellData[end] == -1){ //手が白 -1(bl) → 1(wh)
                while(start >= end){
                    newCellData[start] = 1
                    start -= 9
                }
            }
        }
        state.cellData=newCellData
    },

    //右下方向の処理
    bottomRight(state, stoneData){
        const newCellData = [...state.cellData]
        if(stoneData[1] - stoneData[0] == 9){ //1枚だけの場合

            if(newCellData[stoneData[1]] == 1){ //手が黒 1(wh) → -1(bl)
                newCellData[stoneData[0]] = -1
                newCellData[stoneData[1]] = -1

            }else if(newCellData[stoneData[1]] == -1){ //手が白 -1(bl) → 1(wh)
                newCellData[stoneData[0]] = 1
                newCellData[stoneData[1]] = 1
            }

        }else if(stoneData[1] - stoneData[0] > 9){ //複数枚の場合
            let start = stoneData[0]
            let end = stoneData[1]

            if(newCellData[end] == 1){ //手が黒 1(wh) → -1(bl)
                while(start <= end){
                    newCellData[start] = -1
                    start += 9
                }
            }else if(newCellData[end] == -1){ //手が白 -1(bl) → 1(wh)
                while(start <= end){
                    newCellData[start] = 1
                    start += 9
                }
            }
        }
        state.cellData=newCellData
    },

    //右上方向の処理
    topRight(state, stoneData){
        const newCellData = [...state.cellData]
        if(stoneData[0] - stoneData[1] == 7){ //1枚だけの場合

            if(newCellData[stoneData[1]] == 1){ //手が黒 1(wh) → -1(bl)
                newCellData[stoneData[0]] = -1
                newCellData[stoneData[1]] = -1

            }else if(newCellData[stoneData[1]] == -1){ //手が白 -1(bl) → 1(wh)
                newCellData[stoneData[0]] = 1
                newCellData[stoneData[1]] = 1
            }

        }else if(stoneData[0] - stoneData[1] > 7){ //複数枚の場合
            let start = stoneData[0]
            let end = stoneData[1]

            if(newCellData[end] == 1){ //手が黒 1(wh) → -1(bl)
                while(start >= end){
                    newCellData[start] = -1
                    start -= 7
                }
            }else if(newCellData[end] == -1){ //手が白 -1(bl) → 1(wh)
                while(start >= end){
                    newCellData[start] = 1
                    start -= 7
                }
            }
        }
        state.cellData=newCellData
    },

    //左下方向の処理
    bottomLeft(state, stoneData){
        const newCellData = [...state.cellData]
        if(stoneData[1] - stoneData[0] == 7){ //1枚だけの場合

            if(newCellData[stoneData[1]] == 1){ //手が黒 1(wh) → -1(bl)
                newCellData[stoneData[0]] = -1
                newCellData[stoneData[1]] = -1

            }else if(newCellData[stoneData[1]] == -1){ //手が白 -1(bl) → 1(wh)
                newCellData[stoneData[0]] = 1
                newCellData[stoneData[1]] = 1
            }

        }else if(stoneData[1] - stoneData[0] > 7){ //複数枚の場合
            let start = stoneData[0]
            let end = stoneData[1]

            if(newCellData[end] == 1){ //手が黒 1(wh) → -1(bl)
                while(start <= end){
                    newCellData[start] = -1
                    start += 7
                }
            }else if(newCellData[end] == -1){ //手が白 -1(bl) → 1(wh)
                while(start <= end){
                    newCellData[start] = 1
                    start += 7
                }
            }
        }
        state.cellData=newCellData
    },
}