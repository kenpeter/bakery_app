export class Util {

    constructor(def) {
        this.def = def;
    }

    sortFunc(a, b) {
        return a.num - b.num;
    }

    calCart(inputArr) {
        let res = [];

        // loop each order
        for(let i=0; i<inputArr.length; i++) {
            // 1 order
            let orderObj = inputArr[i];
            // get order key
            let key = Object.keys(orderObj)[0];
            // get how many orders
            let orderNum = orderObj[key];

            // one item def
            let itemDefArr = this.def[key];

            //console.log(`-- key: ${key} --`);
            //console.log(`-- def --`);
            //console.log(itemDefArr);

            let out = this.comSum(itemDefArr, orderNum);

            // test
            //console.log('-- out --');
            //console.log(out);

            res.push(out);

            // test
            //break;
        }

        return res;
    }


    handleMultiSubLists(arr) {
        // 1 element return
        if(arr.length === 1) {
            return arr;
        }

        // we know mini, how many pack we have
        // and we know the index
        let minNum = Number.MAX_SAFE_INTEGER;
        let minIndex = -1;
        for(let i=0; i<arr.length; i++) {
            let subArr = arr[i];
            let accNum = subArr.length;

            if(accNum < minNum) {
                minNum = accNum;
                minIndex = i;
            } else {

            }
        }

        /*
        // test
        console.log('-- min --');
        console.log(minNum);
        console.log(arr[minIndex]);
        */

        // look for subList, has that minNum, push to arr
        let compareArr = [];
        for(let i=0; i<arr.length; i++) {
            let subArr = arr[i];
            let accNum = subArr.length;
            if(accNum === minNum) {
                compareArr.push(subArr);
            } else {

            }
        }

        // more than 2, need to compare max price
        if(compareArr.length > 1) {
            let maxSum = Number.MIN_SAFE_INTEGER;
            let maxIndex = -1;
            for(let i=0; i<compareArr.length; i++) {
                let tmpArr = compareArr[i];

                //console.log('-- tmp arr --');
                //console.log(tmpArr);

                let tmpSum = 0;
                for(let j=0; j<tmpArr.length; j++) {
                    let item = tmpArr[j];
                    let price = item.price;
                    tmpSum += price;
                }

                if(tmpSum > maxSum) {
                    maxSum = tmpSum;
                    maxIndex = i;
                } else {

                }
            }

            return [compareArr[maxIndex]];
        }
    }

    doRounding(dp, t) {
        let max = Number.MIN_SAFE_INTEGER;
        let maxSubList = [];
        for(let i=0; i<dp.length; i++) {
            let subList = dp[i];

            if(subList.length === 0) {
                continue;
            } else {
                let sum = 0;
                // Add up all elements and compare
                for(let j=0; j<subList.length; j++) {
                    let theList = subList[j];

                    // the 1st element
                    for(let k=0; k<theList.length; k++) {
                        let item = theList[k];
                        sum += item.num;
                    }
                }

                if(sum > max) {
                    max = sum;
                    maxSubList = subList;
                } else {

                }
            }
        }

        let obj = {
            max,
            maxSubList
        };

        return obj;
    }

    // the idea is to use slot to cache answer, then reuse them
    comSum(cands, t) {

        /*
        console.log('-- comsum --');
        console.log(cands);
        console.log(t);
        */

        // sort
        cands.sort(this.sortFunc);

        // dp
        let dp = [];

        // - this loop builds each level in dp
        // from 1 to target
        for (let i = 1; i <= t; i++) {
            // we building the sub target list, fresh each time
            // e.g. [ [ 2, 2, 2 ], [ 2, 4 ], [ 3, 3 ] ], -- 6
            // e.g. [ [ 2, 2, 3 ], [ 2, 5 ], [ 3, 4 ] ] -- 7
            let subTargetList = [];

            // - this loop builds individual possible list
            // for each element, if < sub target, consider
            //
            for (let j = 0; j < cands.length && cands[j].num <= i; j++) {
                // special case, the element just equal sub target, so remember it
                if (i === cands[j].num) {
                    // element in a list
                    let tmpList = [cands[j]];
                    subTargetList.push(tmpList);
                } else {
                    // - this loop injects individual element
                    // e.g. 7 (i) - 3 (element) - 1 = 3 index, but to 4 sub target
                    let tmpIndex = i - cands[j].num - 1;

                    /*
                    // test
                    console.log('-- tmpIndex --');
                    console.log(i);
                    console.log(j);
                    console.log(cands[j]);
                    console.log(tmpIndex);
                    */

                    for (let l of dp[tmpIndex]) {

                        /*
                        console.log('-- debug --');
                        console.log(i);
                        console.log(j);
                        console.log(cands[j].num);
                        console.log(i - cands[j].num - 1);
                        console.log(dp);
                        console.log(dp[i - cands[j].num - 1]);
                        console.log(l);
                        */


                        // so form the 4 target, may have many list
                        // if element < 1st element in the list
                        if (cands[j].num <= l[0].num) {
                            // put this element at front + rest
                            let cl = [cands[j], ...l];

                            // now insert
                            subTargetList.push(cl)
                        }
                    } // end for
                } // end else

            } // end for

            // so we push target 1, 2, 3, 4, 5.....7
            dp.push(subTargetList);
        } // end for

        // test
        //console.log('-- dp --');
        //console.log(dp);

        // no answer
        let lastSubList = dp[t-1];
        if(lastSubList.length === 0) {
            // no result
            let obj = this.doRounding(dp, t);
            let maxSubList = obj.maxSubList;
            return maxSubList;
        } else {
            // 1 sub list or 1+ sub list
            //console.log('-- last sub --');
            //console.log(lastSubList);

            // 1 sub list
            if(lastSubList.length === 1) {
                return lastSubList;
            } else {
                // 1+ sub lists
                let out = this.handleMultiSubLists(lastSubList);
                //console.log('-- out --');
                //console.log(out);
                return out;
            }
        }
    }

}
