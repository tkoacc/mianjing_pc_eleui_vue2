<template>
  <div class="article-page">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>面经后台</el-breadcrumb-item>
      <el-breadcrumb-item>面经管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card shadow="never" border="false">
      <!-- 1.头部 -->
      <template #header>
        <div class="header">
          <span>共 {{ total }} 条记录</span>
          <el-button
            @click="open('add')"
            icon="el-icon-plus"
            size="small"
            type="primary"
            round
          >
            添加面经
          </el-button>
        </div>
      </template>
      <!-- 2.表格 -->
      <el-table :data="list" style="width: 100%">
        <el-table-column prop="stem" label="Title"></el-table-column>
        <el-table-column prop="creator" label="Author"></el-table-column>
        <el-table-column prop="likeCount" label="Like"></el-table-column>
        <el-table-column prop="views" label="Views"></el-table-column>
        <el-table-column prop="createdAt" label="UpdatedTime"></el-table-column>
        <el-table-column label="Operation" width="120px">
          <template #default="{ row }">
            <div class="actions">
              <i @click="open('preview', row.id)" class="el-icon-view"></i>
              <i @click="open('edit', row.id)" class="el-icon-edit"></i>
              <i @click="del(row.id)" class="el-icon-delete"></i>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <!-- 3.分页组件 -->
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="current"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>
    <!-- 抽屉 -->
    <el-drawer
      :title="title[type]"
      size="70%"
      :visible.sync="drawer"
      :direction="direction"
      :before-close="handleClose"
    >
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="title" prop="stem">
          <el-input
            placeholder="please input title"
            v-model="form.stem"
          ></el-input>
        </el-form-item>
        <el-form-item label="content" prop="content">
          <!-- manual validation upon losing focus -->
          <!-- 非elementui的组件都无法直接进行校验，需要在失去焦点的时候手动调用form.validateField方法进行校验 -->
          <!-- Components outside of ElementUI cannot be automatically validated.
          Validation needs to be manually triggered by calling the form.validateField method upon losing focus. -->
          <quill-editor
            @blur="$refs.form.validateField('content')"
            v-model="form.content"
          ></quill-editor>
        </el-form-item>
        <el-form-item>
          <el-button @click="submit" type="primary">confirm</el-button>
          <el-button>cancle</el-button>
        </el-form-item>
      </el-form>
    </el-drawer>
  </div>
</template>

<script>
// require styles
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import { quillEditor } from 'vue-quill-editor'
import { addArticle, getArticleList } from '@/api/article'
export default {
  name: 'article-page',
  components: {
    quillEditor
  },
  data() {
    return {
      form: {
        stem: '',
        content: ''
      },
      current: 1,
      pageSize: 10,
      list: [],
      total: 0,
      drawer: false,
      direction: 'rtl',
      // Drawer status, possible values: 'add', 'edit', 'preview'
      type: 'add',
      title: {
        add: 'add',
        edit: 'edit',
        preview: 'preview'
      },
      rules: {
        stem: [
          {
            required: true,
            message: 'Please input title',
            trigger: ['blur', 'change']
          }
        ],
        content: [
          {
            required: true,
            message: 'Please input content',
            trigger: ['blur', 'change']
          }
        ]
      }
    }
  },
  created() {
    this.initData()
  },
  methods: {
    async initData() {
      const { data } = await getArticleList({
        current: this.current,
        pageSize: this.pageSize
      })
      // store the data in the 'data'
      this.list = data.rows
      this.total = data.total
    },
    del(id) {
      console.log(id)
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.initData()
    },
    handleCurrentChange(val) {
      // Modify page number
      this.current = val
      // Refresh data
      this.initData()
    },
    open(type, id) {
      // display drawer
      this.drawer = true
      // set the type
      this.type = type
    },
    handleClose(done) {
      this.$confirm('Confirm closure?')
        .then((_) => {
          done()
        })
        .catch((_) => {})
    },
    submit() {
      // validate the form
      this.$refs.form.validate(async (valid) => {
        if (!valid) return
        // send a request
        await addArticle(this.form)
        // notify the user
        this.$message.success('add success')
        // close the drawer
        this.drawer = false
        // go back to the first page
        this.current = 1
        // rerender the page
        this.initData()
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.el-card {
  margin-top: 25px;
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-right: 16px;
  }
  .actions {
    font-size: 18px;
    display: flex;
    justify-content: space-around;
    color: #666;
    > i:hover {
      color: rgba(114, 124, 245, 1);
      cursor: pointer;
    }
  }
}
.el-pagination {
  margin-top: 20px;
  text-align: center;
}
.el-breadcrumb {
  margin-top: 10px;
}
.el-form {
  padding-right: 40px;
}
.quill-editor {
  ::v-deep .ql-editor {
    height: 300px;
  }
}
.el-rate {
  padding: 10px 0;
}
.article-preview {
  padding: 0 40px 40px 40px;
  > h5 {
    font-size: 20px;
    color: #666;
    border-bottom: 1px dashed #ccc;
    padding-bottom: 30px;
    margin: 0 0 20px 0;
  }
}
</style>
