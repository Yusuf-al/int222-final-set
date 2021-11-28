//API Feature 

class APIFeature{
    
    constructor(qur, qurStrg) {
        this.qur = qur;
        this.qurStrg = qurStrg;
    }

    filter() {
        const quObj = { ...this.qurStrg };
        const exFld = ['limit', 'sort', 'fields'];
        exFld.forEach(el => delete quObj[el]);
    
        let qurStr = JSON.stringify(quObj);
        console.log(qurStr);
        qurStr = qurStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);

        this.qur = this.qur.find(JSON.parse(qurStr));
 
        return this;

        // let allBike = bikes.find(JSON.parse(qurStr));
    }

    sort() {
        if (this.qurStrg.sort) {
            const sortObj = this.qurStrg.sort.split(',').join(' ');
            this.qur = this.qur.sort(sortObj);
        }

        return this;
 
    }

    pagination() {
        const page = this.qurStrg.page * 1 || 1;
        const limit = this.qurStrg.limit * 1 || 10;
        const skip = (page - 1) * limit;

        this.qur = this.qur.skip(skip).limit(limit);

        return this;
    }

    // mulFilter() {
    //     if (this.qurStrg) {
        
    //         let brandQur = this.qurStrg.brand;
    //         const ee = brandQur.split(',');
    //         let obj = {
    //             brand:ee
    //         }
    //         this.qur = this.qur.find(obj);
    //         console.log(obj);
    //     }
    //     return this;
    // }


}

module.exports = APIFeature;