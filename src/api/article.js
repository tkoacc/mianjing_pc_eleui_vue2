import request from '@/utils/request'
export const getArticleList = params => request.get('/admin/interview/query', { params })
export const addArticle = data => request.post('/admin/interview/create', data)
