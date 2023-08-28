import request from '@/utils/request'
export const getArticleList = params => request.get('/admin/interview/query', { params })
