<template>
    <div class="pagination">
        <button
            @click="$emit('formFeed',pageNo-1)"
            :disabled="pageNo == 1"
        >上一页
        </button>
        <button
            @click="$emit('formFeed',1)"
            v-if="startEnd.state>1"
        >1
        </button>
        <button
            v-if="startEnd.state>=2"
        >···
        </button>
        <button
            :disabled="page===pageNo"
            :class="{active:page===pageNo}"
            @click="$emit('formFeed',page)"
            v-for="page in pages"
            :key="page"
        >{{ page }}
        </button>
        <button
            v-if="startEnd.end<pageTotal-1"
        >···
        </button>
        <button
            @click="$emit('formFeed',pageTotal)"
            v-if="startEnd.end<pageTotal"
        >{{ pageTotal }}
        </button>
        <button
            @click="$emit('formFeed',pageNo+1)"
            :disabled="pageNo === pageTotal"
        >下一页
        </button>
        <button style="margin-left: 30px">共 {{ total }} 条</button>
    </div>
</template>

<script>

export default {
    name: "PaginationCom",
    props: {
        pageNo: {
            type: Number,
            required: true
        },
        pageSize: {
            type: Number,
            required: true
        },
        total: {
            type: Number,
            required: true
        },
        pageCount: {
            type: Number,
            default: 5
        }
    },
    computed: {
        pageTotal() {
            return Math.ceil(this.total / this.pageSize)
        },
        startEnd() {
            let {pageNo, pageCount, pageTotal} = this;
            let state = 0, end = 0;
            if (pageTotal < pageCount) {
                state = 1;
                end = pageTotal;
            } else {
                state = pageNo - Math.floor(pageCount / 2);
                end = pageNo + Math.floor((pageCount / 2));
                if (state < 1) {
                    state = 1
                    end = pageCount
                }
                if (end > pageTotal) {
                    end = pageTotal
                    state = pageTotal - pageCount + 1
                }
            }
            return {state, end};
        },
        pages() {
            let arr = [];
            for (let i = 1; i <= this.startEnd.end; i++) {
                arr.push(i)
            }
            return arr.filter(item => (item >= this.startEnd.state))
        }
    }
}
</script>

<style lang="less" scoped>
.pagination {
    button {
        margin: 0 5px;
        background-color: #f4f4f5;
        color: #606266;
        outline: none;
        border-radius: 2px;
        padding: 0 4px;
        vertical-align: top;
        display: inline-block;
        font-size: 13px;
        min-width: 35.5px;
        height: 28px;
        line-height: 28px;
        cursor: pointer;
        box-sizing: border-box;
        text-align: center;
        border: 0;

        &[disabled] {
            color: #c0c4cc;
            cursor: not-allowed;
        }

        &.active {
            cursor: not-allowed;
            background-color: #409eff;
            color: #fff;
        }
    }
}
</style>
