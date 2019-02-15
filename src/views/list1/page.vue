<template>
    <div class="list1">
        <el-header height="40">
            <p><i class="el-icon-menu"></i> 报价列表</p>
        </el-header>
        <el-main>
            <el-row class="searchBox">
                    <el-row :gutter="20">
                    <el-col :span="4">
                        <el-select v-model="categroyId1" @change="getCategoryData(categroyId1,1)" placeholder="请选择一级分类" size="mini">
                            <el-option
                            v-for="item in category1List"
                            :key="item.categoryId"
                            :label="item.categoryName"
                            :value="item.categoryId">
                            </el-option>
                        </el-select>
                    </el-col>
                    <el-col :span="5">
                        <el-select v-model="categroyId2" @change="getCategoryData(categroyId2,2)" placeholder="请选择二级分类" size="mini" :disabled="!categroyId1">
                            <el-option
                            v-for="item in category2List"
                            :key="item.categoryId"
                            :label="item.categoryName"
                            :value="item.categoryId">
                            </el-option>
                        </el-select>
                    </el-col>
                    <el-col :span="5">
                        <el-select v-model="categroyId3" @change="getBrandData(categroyId3)" placeholder="请选择三级分类" size="mini" :disabled="!categroyId2">
                            <el-option
                            v-for="item in category3List"
                            :key="item.categoryId"
                            :label="item.categoryName"
                            :value="item.categoryId">
                            </el-option>
                        </el-select>
                    </el-col>
                    <el-col :span="5">
                        <el-select v-model="offerBrand" placeholder="请选择商品品牌" size="mini" :disabled="!categroyId3">
                            <el-option
                            v-for="item in brandList"
                            :key="item.brandCode"
                            :label="item.brandName"
                            :value="item.brandCode">
                            </el-option>
                        </el-select>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="4" >
                        <el-input v-model="ruleType" placeholder="规格型号" clearable size="mini" ></el-input>
                    </el-col>
                    <el-col :span="5">
                        <el-input v-model="placeOfDelivery"  placeholder="发货地" clearable size="mini" ></el-input>
                    </el-col>
                    <el-col :span="5">
                        <el-input v-model="supplierRemark"  placeholder="备注" clearable size="mini" ></el-input>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="4" >
                        <el-input v-model="goodsName" placeholder="请输入商品名称" clearable size="mini" ></el-input>
                    </el-col>
                    <el-col :span="5">
                        <el-input v-model="minPrice" type="number" placeholder="含税最低价格" clearable size="mini" ></el-input>
                    </el-col>
                    <el-col :span="5">
                        <el-input v-model="maxPrice" type="number" placeholder="含税最高价格" clearable size="mini" ></el-input>
                    </el-col>
                </el-row>
            </el-row>
            <el-row class="tableBtn">
                <el-button type="primary" size="mini" @click="goSearch()">搜索</el-button>
                <el-button type="primary" size="mini" @click="resetInput()">重置</el-button>
                <el-button type="primary" size="mini" @click="addData">新增</el-button>
                <el-button type="primary" size="mini" @click="resetData">修改</el-button>
                <el-button type="primary" size="mini" @click="exportData">导出</el-button>
                <el-button size="mini" type="primary" @click="importData">导入</el-button>
                <!-- <el-button type="primary" size="mini" @click="deleFun()">删除</el-button> -->

                <el-popover placement="right" width="200" trigger="click">
                    <ul class="colItem clear">
                        <li v-for="(item,index) in dropCol" :key="index" :class="item.prop" :show="item.show">
                            <el-switch v-model="item.show" @change='colShowList(dropCol)'></el-switch>{{item.label}}
                        </li>
                    </ul>
                    <el-button slot="reference" class="colShow" type="primary" size="mini">操作</el-button>
                </el-popover>
            </el-row>
            <el-table :data="tableData" border row-key="id" align="left" @selection-change="handleSelectionChange" highlight-current-row @sort-change="sortChange">
                <el-table-column
                type="selection"
                width="55">
                </el-table-column>
                <el-table-column prop="picUrl" label='图片'>
                    <template slot-scope="scope">
                        <img :src="scope.row.picUrl" class="picUrl" width="40px" height="40px" />
                    </template>
                </el-table-column>
                <el-table-column 
                v-for="(item, index) in col" 
                :key="`col_${index}`" 
                :prop="item.prop" 
                :label="item.label" 
                :fixed="item.prop=='orderNumber'"
                :width="item.width?item.width:''"
                :sortable="item.prop == 'exclusiveOfTax'?'custom':(item.prop == 'unitPriceContainingTax'?'custom':(item.prop == 'oneDeliveryCost'?'custom':(item.prop == 'retailPrice'?'custom':(item.prop == 'platformPrice'?'custom':false))))"
                >
                </el-table-column>
            </el-table>
        </el-main>
        <el-footer>
            <el-pagination :page-sizes="[10, 20, 30, 50]" :page-size="10" @size-change="handleSizeChange" @current-change="handleCurrentChange" layout="total, sizes, prev, pager, next" :total="total">
            </el-pagination>
        </el-footer>
    </div>
</template>
<script>
import Sortable from 'sortablejs'
import { Message } from 'element-ui'
import { getGoodsOffer, exportGoodsOffer, importGoodsOffer, categoryData, brandData,deleGoodsOffer } from '../../api/sys.listpage.js'

export default {
    name: "list1",
    data() {
        return {
            col: [],
            dropCol: [{
                    label: '序号',
                    prop: 'orderNumber',
                    show: true
                },
                {
                    label: '一级类目',
                    prop: 'fristCategoryTreeName',
                    show: true
                },
                {
                    label: '二级类目',
                    prop: 'secondCategoryTreeName',
                    show: true
                },
                {
                    label: '三级类目',
                    prop: 'threeCategoryTreeName',
                    show: true
                },
                {
                    label: '品牌',
                    prop: 'brandName',
                    show: true
                },
                {
                    label: '商品名称',
                    prop: 'goodName',
                    show: true
                },
                {
                    label: '规格型号',
                    prop: 'ruleType',
                    show: true
                },
                {
                    label: '箱规重量',
                    prop: 'weight',
                    show: true
                },
                {
                    label: '单件重量',
                    prop: 'singleWeight',
                    show: true
                },
                {
                    label: '箱规尺寸',
                    prop: 'boxGaugeSize',
                    show: true
                },
                {
                    label: '单件尺寸',
                    prop: 'size',
                    show: true
                },
                {
                    label: '颜色',
                    prop: 'colour',
                    show: true
                },
                {
                    label: '不含税供应单价',
                    prop: 'exclusiveOfTax',
                    width:'146px',
                    show: true
                },
                {
                    label: '税点成本(百分比)',
                    prop: 'taxPointCost',
                    width:'140px',
                    show: true
                },
                {
                    label: '含税单价(专票)',
                    prop: 'unitPriceContainingTax',
                    width:'150px',
                    show: true
                },
                {
                    label: '一件代发成本',
                    prop: 'oneDeliveryCost',
                    width:'138px',
                    show: true
                },
                {
                    label: '建议零售价',
                    prop: 'retailPrice',
                    width:'128px',
                    show: true
                },
                {
                    label: '电商平台价(京东)',
                    prop: 'platformPrice',
                    width:'160px',
                    show: true
                },
                {
                    label: '有无现货',
                    prop: 'spotOrNot',
                    show: true
                },
                {
                    label: '发货地',
                    prop: 'placeOfDelivery',
                    show: true
                },
                {
                    label: '运费说明',
                    prop: 'freightDescription',
                    show: true
                },
                {
                    label: '发货周期',
                    prop: 'deliveryCycle',
                    show: true
                },
                {
                    label: '备注',
                    prop: 'supplierRemark',
                    show: true
                }
            ],
            tableData: [],
            total: 0,
            pageSize: 10,
            pageNum: 1,
            multipleSelection: [],
            //搜索框列表
            category1List: [],
            category2List: [],
            category3List: [],
            supplierList: [],
            brandList: [],
            //搜索框值
            goodsName:'',
            maxPrice:'',
            minPrice:'',
            supplierId: sessionStorage.getItem("uuid")||"",
            categroyId1: '',
            categroyId2: '',
            categroyId3: '',
            offerBrand: '',
            ruleType:'',
            placeOfDelivery:'',
            supplierRemark:'',
            //排序
            sort:''
        }
    },
    components: {},
    mounted() {
        this.rowDrop()
        this.columnDrop()
        setTimeout(() => {
            this.getData()
            this.getCategoryData(0, 0);
        }, 100)
    },
    methods: {
        //行拖拽
        rowDrop() {
            const tbody = document.querySelector('.el-table__body-wrapper tbody')
            const _this = this
            Sortable.create(tbody, {
                animation: 180,
                onEnd({ newIndex, oldIndex }) {
                    const currRow = _this.tableData.splice(oldIndex, 1)[0]
                    _this.tableData.splice(newIndex, 0, currRow)
                }
            })
        },
        //列拖拽
        columnDrop() {
            const wrapperTr = document.querySelector('.colItem')
            this.sortable = Sortable.create(wrapperTr, {
                animation: 180,
                delay: 0,
                onEnd: evt => {
                    var list = [];
                    var eleList = wrapperTr.childNodes;
                    eleList.forEach((element, index) => {
                        // var showFlag = element.getAttribute("show");
                        var obj = {};
                        obj.show = element.getAttribute("show");
                        obj.prop = element.getAttribute("class");
                        obj.label = element.innerText;
                        list.push(obj);
                    });
                    this.colShowList(list);
                }
            })
        },
        colChange(item, index) {

        },
        colShowList(colList) {
            let list = [];
            colList.filter((ele, index, arr) => {
                if (ele.show) {
                    list.push(ele);
                }
            })
            this.col = list;
        },
        //分页
        handleCurrentChange(val) {
            this.pageNum = val
            if (this.categroyId2 == '') {
                this.getData()
            } else {
                this.goSearch()
            }

        },
        //分页大小
        handleSizeChange(val) {
            this.pageSize = val
            if (this.categroyId2 == '') {
                this.getData()
            } else {
                this.goSearch()
            }
        },
        //搜索
        goSearch() {
            let _this = this;
            this.pIndex = 1;
            this.pSize = 10;
            this.getData();
        },
        //重置
        resetInput() {
            this.goodsName = '',
            this.minPrice = '',
            this.maxPrice = '',
            this.categroyId1 = ''
            this.categroyId2 = ''
            this.categroyId3 = ''
            this.offerBrand = ''
            this.pageSize = 10
            this.pageNum = 1
            this.ruleType = '';
            this.placeOfDelivery = '';
            this.supplierRemark = '';
            this.sort = '';
            this.getData()
        },
        // 获取表格数据
        getData() {
            let _this = this;
            let data = {
                supplierId:this.supplierId,
                goodName:this.goodsName,
                minPrice:this.minPrice,
                maxPrice:this.maxPrice,
                fristCategoryTreeId: this.categroyId1, 
                secondCategoryTreeId: this.categroyId2, 
                threeCategoryTreeId: this.categroyId3 ,
                brandCode: this.offerBrand,
                pIndex: this.pageNum,
                pSize: this.pageSize,
                ruleType:this.ruleType,
                placeOfDelivery:this.placeOfDelivery,
                supplierRemark:this.supplierRemark,
            }
            if(this.sort){
                data = {...data,sort : this.sort}
            }
            getGoodsOffer(data).then(res => {
                if (res.code === "success") {
                    _this.tableData = res.data
                    _this.total = res.total
                }
            }).catch(res => {
                console.log(res)
            })
        },
        //排序
        sortChange(val){
            let text = '';
            if(val.prop == "exclusiveOfTax"){
                text = 'exclusive_of_tax'
            }else if(val.prop == "unitPriceContainingTax"){
                text = 'unit_price_containing_tax'
            }else if(val.prop == "oneDeliveryCost"){
                text = 'one_delivery_cost'
            }else if(val.prop == "retailPrice"){
                text = 'retail_price'
            }else if(val.prop == "platformPrice"){
                text = 'platform_price'
            }
            
            if(val.order == 'descending'){
                this.sort = "(A."+text+"+0) desc";
            }else if(val.order == 'ascending'){
                this.sort = "(A."+text+"+0) asc";
            }
            this.getData();
        },

        //新增
        addData() {
            this.$router.push({name:'editor',params:{type:0}})
        },
        //修改
        resetData() {
            if(this.multipleSelection.length == 1){
                window.localStorage.setItem("goodsItem", JSON.stringify(this.multipleSelection[0].orderNumber))
                this.$router.push({name:'editor',params:{type:1}})
            }else{
                Message({
                    message: '请选择单条数据修改',
                    type: 'warning',
                    duration: 5 * 1000
                })
                return;
            }
            
        },
        //导出数据
        exportData() {
            let _this = this;
            let token = sessionStorage.getItem("token")||"";
            let str = "";
            str += "token="+token;
            str += "&goodName="+this.goodsName;
            str += "&supplierId="+this.supplierId;
            str += "&minPrice="+this.minPrice;
            str += "&maxPrice="+this.maxPrice;
            str += "&fristCategoryId="+this.categroyId1;
            str += "&secondCategoryId="+this.categroyId2;
            str += "&threeCategoryId="+this.categroyId3;
            str += "&brandCode="+this.offerBrand;
            str += "&ruleType="+this.ruleType;
            str += "&placeOfDelivery="+this.placeOfDelivery;
            str += "&supplierRemark="+this.supplierRemark;
            exportGoodsOffer(str)
        },
        //导入数据
        importData() {
            let file = document.createElement("input");
            file.name = "file"
            file.type = 'file'
            // file.accept = "application/vnd.ms-excel"
            file.click();
            file.addEventListener("change", function(e) {
                let file = e.path[0]["files"][0]
                let formData = new FormData();
                formData.append("file", file)
                importGoodsOffer(formData).then(res => {
                    if (res.code === "success") {
                        Message({
                            message: res.message,
                            type:"success",
                            duration: 3 * 1000
                        })
                        this.getData();
                    }
                }).catch(res => {
                    console.log(res)
                })
            })
        },

        getCategoryData(categroyId, index) {
            categoryData({
                    categroyId
                })
                .then(async res => {
                    if (index == 0) {
                        this.category1List = res.data;
                    }
                    if (index == 1) {
                        this.category2List = res.data;
                        this.categroyId2 = ''
                        this.categroyId3 = ''
                        this.offerBrand = ''
                    }
                    if (index == 2) {
                        this.category3List = res.data;
                        this.categroyId3 = ''
                        this.offerBrand = ''
                    }
                })
                .catch(err => {
                    console.log("err: ", err);
                });
        },
        getBrandData(categroyId) {
            brandData({
                    categroyId
                })
                .then(async res => {
                    this.brandList = res.data;
                })
                .catch(err => {
                    console.log("err: ", err);
                });
        },
                //选中行
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        deleFun(){
            if(this.multipleSelection.length > 0){
                this.$confirm('此操作将删除选中数据, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {
                    let offerAttrs = [];
                    this.multipleSelection.forEach((item,index)=>{
                        offerAttrs.push(item.orderNumber);
                    });
                    offerAttrs = offerAttrs.join(",");
                    deleGoodsOffer({offerAttrs})
                    .then(async res=>{
                        Message({
                            message:"删除成功！",
                            type: 'success'
                        });
                        this.getData();
                    }).catch(err => {
                        console.log("err: ", err);
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });          
                });
            }else{
                Message({
                    message:"请勾选您要删除的数据",
                    type: 'warning'
                })
            }
        }
    },
    created() {
        this.colShowList(this.dropCol);
    }
};
</script>
<style scoped>
.el-header {
    text-align: left;
    font-size: 14px;
    line-height: 40px;
    border-bottom: 1px solid #ededed;
    color: #2083D8;
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

.el-footer{
    position: fixed;
    bottom: 14px;
    right: 17px;
    padding: 0 100px;
    background-color: white;
    height: 40px!important;
    z-index: 100;
}

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

.searchBox {
    padding-bottom: 20px;
}
.searchBox .el-row{
    padding-bottom: 10px;
}
.el-select {
    width: 100%;
}
.el-main{
    padding-bottom: 40px;
}
</style>