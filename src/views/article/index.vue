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
          <el-button icon="el-icon-plus" size="small" type="primary" round>
            添加面经
          </el-button>
        </div>
      </template>
      <!-- 2.表格 -->
      <el-table :data="list" style="width: 100%">
        <el-table-column prop="stem" label="title"></el-table-column>
        <el-table-column prop="creator" label="author"></el-table-column>
        <el-table-column prop="likeCount" label="like"></el-table-column>
        <el-table-column prop="views" label="views"></el-table-column>
        <el-table-column prop="createdAt" label="updatedTime"></el-table-column>
      </el-table>
      <!-- 3.分页组件 -->
    </el-card>
  </div>
</template>

<script>
import { getArticleList } from '@/api/article'
export default {
  name: 'article-page',
  data() {
    return {
      current: 1,
      pageSize: 10,
      list: [],
      total: 0
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
