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
            console.log('-- out --');
            console.log(out);

            res.push(out);

            // test
            break;
        }

        return res;
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

        return dp;
    }

}
