<template>
    <div class="list1">
        <el-header height="40">
            <p>
                <router-link to="/list1">
                    <i class="el-icon-arrow-left"></i>返回列表</router-link>
            </p>
        </el-header>
        <el-main>
            <el-form ref="form" :model="sizeForm" label-width="160px" size="mini">
                <el-row class="pb10">
                    <el-col :span="12">
                        <el-form-item label="一级分类:">
                            <el-select v-model="sizeForm.fristCategoryId" @change="getCategoryData(sizeForm.fristCategoryId,1)" placeholder="请选择一级分类" size="mini">
                                <el-option v-for="item in category1List" :key="item.categoryId" :label="item.categoryName" :value="item.categoryId">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="二级分类:">
                            <el-select v-model="sizeForm.secondCategoryId" @change="getCategoryData(sizeForm.secondCategoryId,2)" placeholder="请选择二级分类" size="mini">
                                <el-option v-for="item in category2List" :key="item.categoryId" :label="item.categoryName" :value="item.categoryId">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="三级分类:">
                            <el-select v-model="sizeForm.threeCategoryId" @change="getBrandData(sizeForm.threeCategoryId)" placeholder="请选择三级分类" size="mini">
                                <el-option v-for="item in category3List" :key="item.categoryId" :label="item.categoryName" :value="item.categoryId">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="品牌:">
                            <el-select v-model="sizeForm.brandCode" placeholder="请选择品牌" size="mini" filterable allow-create default-first-option>
                                <el-option v-for="(item , index) in brandList" :key="index" :label="item.brandName" :value="item.brandCode">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row class="pb10">
                    <el-col :span="12">
                        <el-form-item label="商品名称:">
                            <el-input v-model="sizeForm.goodName"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="规格型号">
                            <el-input v-model="sizeForm.ruleType"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="箱规重量:">
                            <el-input v-model="sizeForm.weight"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="单件重量:">
                            <el-input v-model="sizeForm.singleWeight"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="箱规尺寸">
                            <el-input v-model="sizeForm.boxGaugeSize"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="单件尺寸:">
                            <el-input v-model="sizeForm.size"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="颜色:">
                            <el-input v-model="sizeForm.colour"></el-input>
                        </el-form-item>
                    </el-col>                
                    <el-col :span="12">
                        <el-form-item label="起订量:">
                            <el-input v-model="sizeForm.minQuantity"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row class="pb10">
                    <el-col :span="12">
                        <el-form-item label="不含税供应单价">
                            <el-input v-model="sizeForm.exclusiveOfTax" @input="taxChange(0)"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="税点成本（百分比）">
                            <el-input v-model="sizeForm.taxPointCost" @input="taxChange(1)"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="含税单价（专票）">
                            <el-input v-model="sizeForm.unitPriceContainingTax" @input="taxChange(2)"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12"></el-col>
                    <el-col :span="12">
                        <el-form-item label="物流成本百分比">
                            <el-input v-model="sizeForm.logisticsCostPercent"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="一件代发成本">
                            <el-input v-model="sizeForm.oneDeliveryCost"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="建议零售价">
                            <el-input v-model="sizeForm.retailPrice"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="电商平台价(京东)">
                            <el-input v-model="sizeForm.platformPrice"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row class="pb10">
                    <el-col :span="12">
                        <el-form-item label="有无现货">
                            <el-select v-model="sizeForm.spotOrNot" placeholder="请选择" size="mini">
                                <el-option label="有" value="有"> </el-option>
                                <el-option label="无" value="无"> </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="发货地">
                            <el-input v-model="sizeForm.placeOfDelivery"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="发货周期">
                            <el-input v-model="sizeForm.deliveryCycle"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="运费说明">
                            <el-input v-model="sizeForm.freightDescription"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item label="供应商备注:">
                            <el-input v-model="sizeForm.supplierRemark"></el-input>
                        </el-form-item>
                    </el-col>
                    <!-- <el-col :span="24">
                        <el-form-item label="平台备注:">
                            <el-input v-model="sizeForm.platRemark"></el-input>
                        </el-form-item>
                    </el-col> -->
                    <el-col :span="12">
                        <el-upload class="upload-demo" 
                        :multiple="false" 
                        action="#" 
                        ref="newupload" 
                        accept=".jpg,.png" 
                        :before-upload="beforeUpload" 
                        :on-remove="handleRemove" 
                        :file-list="fileList2" 
                        list-type="picture">
                            <el-button size="small" type="primary">点击上传</el-button>
                            <div slot="tip" class="el-upload__tip">上传jpg/png文件，最大尺寸：200*200且不超过2M<span class="preview" @click="preview">预览</span></div>
                        </el-upload>
                    </el-col>
                </el-row>
                <el-row class="pb10 noborder">
                    <el-col :span="24">
                        <el-form-item>
                            <el-button type="primary" size="medium" @click="submit">提 交</el-button>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <el-dialog
            title="上传图片预览"
            :visible.sync="dialogVisible"
            width="400px"
            >
                <div class="block">
                    <el-carousel trigger="click" height="300px">
                        <el-carousel-item v-for="(item,index) in fileList2" :key="index">
                            <img :src="item.url" alt="" width="83.3%" height="100%">
                        </el-carousel-item>
                    </el-carousel>
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible = false">关闭</el-button>
                </span>
            </el-dialog>
        </el-main>
        <el-footer>
        </el-footer>
    </div>
</template>
<script>
import { addGoodsOffer, updateGoodsOffer, brandData, categoryData,fileLoad } from '../../../api/sys.listpage.js'
export default {
    name: "editList1",
    data() {
        return {
            sizeForm: {
                //必须有默认值，，搜索下拉控件bug
                brandCode:''
            },
            fileList2: [],
            category1List: [],
            category2List: [],
            category3List: [],
            brandList: [],
            editor: this.$route.params.type||0,
            supplierId:sessionStorage.getItem("uuid")||"",
            dialogVisible:false
        };
    },
    components: {},
    created() {
        setTimeout(() => {
            if (this.editor == 1) {
                let data = JSON.parse(window.localStorage.getItem("goodsItem"));
                this.sizeForm = data
                this.editor = true;
                this.fileList2 = [{ name: "", url: data.picUrl }];
                this.getCategoryData(0, 0)
                this.getOptions(data.fristCategoryId, 2)
                this.getOptions(data.secondCategoryId, 3)
                this.getBrandList(data.threeCategoryId)
            } else {
                this.getCategoryData(0, 0)
                this.brandList = [{"brandName":"其他","brandCode":''}]
                this.editor = false;
            }
        }, 200)

    },
    mounted() {

    },
    methods: {
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        beforeUpload(file) {
            let fd = new FormData();
            fd.append("file", file);
            fd.append("_sysid_", window.sysId);
            fileLoad(fd).then(res => {
                let list = res.data.data;
                list.find((item) => {
                    let obj = {};
                    obj.name = item.oldFilename;
                    obj.url = item.filePath;
                    this.fileList2 = [];
                    this.fileList2.push(obj);
                });
            });
            return true;
        },
        detailData() {
            let data = this.sizeForm
            let brand = this.brandList.find((item) => {
                return item.brandCode == data.brandCode
            })
            let frist = this.category1List.find((item) => {
                return item.categoryId == data.fristCategoryId
            })
            
            let second = this.category2List.find((item) => {
                return item.categoryId == data.secondCategoryId
            })
            let three = this.category3List.find((item) => {
                return item.categoryId == data.threeCategoryId
            })
            let submitData = { ...this.sizeForm, ...brand };
            submitData.fristCategoryId = frist.categoryId
            submitData.fristCategoryTreeName = frist.categoryName
            submitData.fristCategoryTreeCode = frist.categoryTreeCode
            submitData.secondCategoryId = second.categoryId
            submitData.secondCategoryTreeName = second.categoryName
            submitData.secondCategoryTreeCode = second.categoryTreeCode
            submitData.threeCategoryId = three.categoryId
            submitData.threeCategoryTreeName = three.categoryName
            submitData.threeCategoryTreeCode = three.categoryTreeCode
            if(!brand){
                //自定义品牌
                submitData.brandName = submitData.brandCode;
            }
            return submitData
        },
        submit() {
            if(!this.fileList2[0]){
                this.$message("请上传图片");
                return;
            }
            let data = { ...this.detailData(), picUrl: this.fileList2[0].url ,supplierId:this.supplierId}
            if (this.editor) {
                // 更新
                updateGoodsOffer(data).then(res => {
                    this.$message({message:res.message,type:"success"})
                }).catch(res => {
                    console.log(res)
                })
            } else {
                //新建
                addGoodsOffer(data).then(res => {
                    this.$message({message:res.message,type:"success"})
                }).catch(res => {
                    console.log(res)
                })
            }
        },
        getOptions(categroyId, index) {
            categoryData({
                categroyId
            }).then(res => {
                if (index === 2) {
                    this.category2List = res.data
                } else if (index === 3) {
                    this.category3List = res.data
                }
            }).catch(res => {
                console.log(res)
            })
        },
        getBrandList(categroyId) {
            let that = this
            brandData({
                    categroyId
                })
                .then(async res => {
                    that.brandList = res.data;
                })
                .catch(err => {
                    console.log("err: ", err);
                });
        },
        update() {

        },
        // 一级分类 二级分类 三级分类  
        getCategoryData(categroyId, index) {
            categoryData({
                    categroyId
                }).then(res => {
                    if (index == 0) {
                        this.category1List = res.data;
                    } else if (index == 1) {
                        this.category2List = res.data;
                        this.sizeForm.secondCategoryId = ''
                        this.sizeForm.threeCategoryId = ''
                    } else if (index == 2) {
                        this.category3List = res.data;
                        this.sizeForm.threeCategoryId = ''
                    } else if (index == 3) {
                        this.getBrandData(categroyId)
                    }
                })
                .catch(err => {
                    console.log("err: ", err);
                });
        },
        getBrandData(categroyId) {
            let that = this;
            brandData({
                    categroyId
                })
                .then(res => {
                    that.brandList = res.data;
                })
                .catch(err => {
                    console.log("err: ", err);
                });
        },
        //自动计算不含税单价
        taxChange(index){
            let exclusiveOfTax = this.sizeForm.exclusiveOfTax;
            let taxPointCost = this.sizeForm.taxPointCost;
            let unitPriceContainingTax = this.sizeForm.unitPriceContainingTax;
            // exclusiveOfTax taxPointCost unitPriceContainingTax
            if(index == 0){
                // X
                if(taxPointCost){
                    taxPointCost = taxPointCost.split("%")[0]/100;
                    this.sizeForm.unitPriceContainingTax = exclusiveOfTax*(1+taxPointCost);
                }
            }else if(index == 1){
                //倍率
                if(exclusiveOfTax){
                    taxPointCost = taxPointCost.split("%")[0]/100;
                    this.sizeForm.unitPriceContainingTax = exclusiveOfTax*(1+taxPointCost);
                }

            }else if(index == 2){
                //y
                if(taxPointCost){
                    taxPointCost = taxPointCost.split("%")[0]/100;
                    this.sizeForm.exclusiveOfTax = unitPriceContainingTax/(1+taxPointCost);
                }
            }
        },
            //预览
        preview(){
            this.dialogVisible = true
        }
    }
};
</script>
<style scoped>
.el-header {
    text-align: left;
    font-size: 14px;
    line-height: 40px;
    border-bottom: 1px solid #ededed;
    color: #2083d8;
}

.list1 {
    min-height: 100%;
    background-color: white;
}

.tableBtn {
    text-align: left;
}

.el-table {
    border: 1px solid #eeeeee;
    margin-top: 5px;
}

.el-footer {}

.colShow {
    float: right;
}

.colItem {
    line-height: 40px;
    padding-left: 20px;
    border-bottom: 1px solid #eeeeee;
    cursor: pointer;
}

.colItem:last-of-type {
    border: none;
}

.el-switch {
    margin-right: 10px;
}

.el-select {
    width: 100%;
}

.el-upload__tip {
    display: block;
}

.el-form {
    width: 800px;
}

.el-form-item__content {
    position: relative;
}
.pb10{
    padding-top: 10px ;
    border-bottom: 1px solid #eeeeee;
}
.pb10.noborder{
    border: none;
}
.preview{
    color: #2083d8;
    display: inline-block;
    padding-left: 10px;
    cursor: pointer;
}
</style>