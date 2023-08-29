import request from '@/utils/request'
export const getArticleList = params => request.get('/admin/interview/query', { params })
export const addArticle = data => request.post('/admin/interview/create', data)
export const removeArticle = id => request.delete('/admin/interview/remove', { data: { id } })
export const getArticleDetail = id => request.get('/admin/interview/show', { params: { id } })
export const updateArticle = data => request.put('/admin/interview/update', data)
