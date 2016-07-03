var API_KEY = ''
var API_URL = ''
var PARAMS = '?apikey=' + API_KEY;
var WEATHER_URL = 'http://api.map.baidu.com/telematics/v3/weather?location=%E4%B8%8A%E6%B5%B7&output=json&ak=6tYzTvGZSOpYB5Oc2YGGOKt8';
exports.REQUEST_URL = API_URL + PARAMS;
exports.HN_ITEM_ENDPOINT = 'https://hacker-news.firebaseio.com/v0/item/';
exports.WEATHER_URL = WEATHER_URL;

var TASK_LIST_URL = IP + '/bpm/task/personalTasks.do?'
var VIEW_TASK_URL = IP + '/bpm/task/viewTaskForm.do?'
var COMPLETE_TASK_URL = IP + '/bpm/task/completeTask.do?'
exports.REQUEST_TASK_LIST_URL = TASK_LIST_URL;
exports.REQUEST_VIEW_TASK_URL = VIEW_TASK_URL;
exports.REQUEST_COMPLETE_TASK_URL = COMPLETE_TASK_URL;


var IP = 'http://192.168.160.84:8081';

{ /** 登录**/ }
var LOGIN_URL = IP + '/bpm/task/login.do?';
exports.LOGIN_URL = LOGIN_URL;
{ /*  公告通知  */ }
var NOTICE_URL = IP + '/bpm/task/findAllCmsArticle.do';
exports.NOTICE_URL = NOTICE_URL;
{ /*  公告通知详情  */ }
var NOTICE_DETIAL_URL = IP + '/bpm/task/cms-article-view.do?id=';
exports.NOTICE_DETIAL_URL = NOTICE_DETIAL_URL;
{ /*我发起的接口*/ }
var OFFICE_MYCREATED_URL = IP + '/bpm/task/listProcessInstances.do?';
exports.OFFICE_CREATED = OFFICE_MYCREATED_URL;
 { /** 查询通讯录**/ }
var SEARCH_ADDRESSLIST_URL = IP + '/bpm/task/findAddressByUserName.do?';
exports.SEARCH_ADDRESSLIST_URL = SEARCH_ADDRESSLIST_URL;
{ /** 我的审批列表**/ }
var OFFICE_IAPPROVALLIST_URL = IP + '/bpm/task/historyTasks.do?';
exports.OFFICE_IAPPROVALLIST = OFFICE_IAPPROVALLIST_URL;
{ /** 我的代理列表**/ }
var SEARCH_AGENT_URL = IP + '/bpm/task/delegatedTasks.do?';
exports.SEARCH_AGENT_URL = SEARCH_AGENT_URL;
{ /** 待办任务数**/ }
var TASKCOUNT_URL = IP + '/bpm/task/personalTasksCount.do?';
exports.TASKCOUNT_URL = TASKCOUNT_URL;
{ /** 待办任务列表**/ }
var TASKLIST_URL = IP + '/bpm/task/personalTasks.do?';
exports.TASKLIST_URL = TASKLIST_URL;
{ /** 待办任务详情**/ }
var TASKDETAIL_URL = IP + '/bpm/task/viewProcessTaskDeatil.do?';
exports.TASKDETAIL_URL = TASKDETAIL_URL;
{ /** 获取审批任务详情**/ }
var VIEWTASKFROM_URL = IP + '/bpm/task/viewTaskForm.do?';
exports.VIEWTASKFROM_URL = VIEWTASKFROM_URL;
{ /** 审批提交**/ }
var APPROVAL_TASK = IP + '/bpm/task/completeTask.do?';
exports.APPROVAL_TASK = APPROVAL_TASK;
{ /** 我的审批->审批详情**/ }
var SHOWTASKDETAL_URL = IP + '/bpm/task/viewProcessTaskDeatil.do?';
exports.SHOWTASKDETAL_URL = SHOWTASKDETAL_URL;
{ /* 修改用户信息接口*/ }
var EDIT_USER_INFO_URL = IP + "/bpm/task/edtiUser.do?";
exports.EDIT_USER_INFO_URL = EDIT_USER_INFO_URL;
{ /*office  模块列表*/ }
var OFFICE_MOUDEL_URL = IP + "/bpm/task/bpmType.do";
exports.OFFICE_MOUDEL_URL = OFFICE_MOUDEL_URL;
{ /*office 办公列表*/ }
var OFFICE_LIST_URL = IP + "/bpm/task/bpmProcess.do?id=";
exports.OFFICE_LIST_URL = OFFICE_LIST_URL;
{ /*office 办公列表详情*/ }
var OFFICE_LIST_DETAIL_URL = IP + "/bpm/task/viewStartForm.do?bpmProcessId=";
exports.OFFICE_LIST_DETAIL_URL = OFFICE_LIST_DETAIL_URL;
{ /*office 办公列表详情提交*/ }
var OFFICE_LIST_DETAILCOMMIT_URL = IP + "/bpm/task/startProcessInstance.do?userId=";
exports.OFFICE_LIST_DETAILCOMMIT_URL = OFFICE_LIST_DETAILCOMMIT_URL;
{ /*office 办公附件上传接口*/ }
var OFFICE_LIST_UPLOADFILE_URL = IP + "/bpm/task/fileUpload.do";
exports.OFFICE_LIST_UPLOADFILE_URL = OFFICE_LIST_UPLOADFILE_URL;
{ /*office 办公附件下载*/ }
var OFFICE_LIST_DOWNLOADFILE_URL = IP + "/bpm/task/downFile.do?model=form&width=0&path=";
exports.OFFICE_LIST_DOWNLOADFILE_URL = OFFICE_LIST_DOWNLOADFILE_URL;
{ /*office 头像下载*/ }
var PHOTO_DOWN = 'https://tse1-mm.cn.bing.net/th?id=OIP.M5e976f7548e7bba91aa8456d85b83f15o1&pid=15.1&';
exports.PHOTO_DOWN = PHOTO_DOWN;
{ /*office 邮箱电话信息下载*/ }
var PHONENUMBER_EMAIL_GET = IP + '/bpm/task/findPersonInfo.do?userName=';
exports.PHONENUMBER_EMAIL_GET = PHONENUMBER_EMAIL_GET;
{ /* 新闻轮播图片列表*/ }
var NEW_GET = IP + '/bpm/task/newsData.do';
exports.NEW_GET = NEW_GET;
{ /* 新闻轮播图片地址*/ }
var NEW_GETIMAGE=IP+'/bpm/task/newsImage.do?path=';
exports.NEW_GETIMAGE = NEW_GETIMAGE;
{/* 关联单*/}
var LINK_TASK=IP+'/bpm/task/viewProcessTaskDeatilByLinkedProcessNo.do?';
exports.LINK_TASK = LINK_TASK;
{/* 获取版本号*/}
var GET_NEWVERSION_URL=IP+'/bpm/task/findLatestVersionByPlatform.do?platform=';
exports.GET_NEWVERSION_URL = GET_NEWVERSION_URL;
{/* 帮助与反馈*/}
var ME_HELP = 'http://cn.bing.com/';
exports.ME_HELP = ME_HELP;
{/* 版本信息*/}
var ME_VERSION = IP + '/BPM-H5/versions.html';
exports.ME_VERSION = ME_VERSION;
{/* 转办功能列表*/}
var APPROVAL_DEAL_WITH_BUTTON = IP + '/bpm/task/processNodeButtons.do?humanTaskId=';
exports.APPROVAL_DEAL_WITH_BUTTON = APPROVAL_DEAL_WITH_BUTTON;
{/* 转办功能执行*/}
var APPROVAL_DEAL_WITH = IP + '/bpm/task/processingTask.do?';
exports.APPROVAL_DEAL_WITH = APPROVAL_DEAL_WITH;
{/* 转办人员列表*/}
var APPROVAL_DEAL_WITH_STAFF = IP + '/bpm/task/findUserByData.do?';
exports.APPROVAL_DEAL_WITH_STAFF = APPROVAL_DEAL_WITH_STAFF;
{ /*  消息通知  */ }
var MESSAGE_URL = IP + '/bpm/task/findMessageByUser.do?userId=';
exports.MESSAGE_URL = MESSAGE_URL;

{ /*  工作联系单 业务类型  */ }
var CONTACT_TYPE_URL = IP + '/bpm/task/findTaskType.do';
exports.CONTACT_TYPE_URL = CONTACT_TYPE_URL;
{ /*  工作联系单 详情  */ }
var CONTACT_DETAIL_URL = IP + '/bpm/task/lookWorkMenu.do?id=';
exports.CONTACT_DETAIL_URL = CONTACT_DETAIL_URL;
{ /*  工作联系单 列表  */ }
var CONTACT_LIST_URL = IP + '/bpm/task/findWorkMenu.do?';{ /*userId=&pageNo=&title=&taskStatus=*/ }
exports.CONTACT_LIST_URL = CONTACT_LIST_URL;
{ /*  工作联系单 创建  */ }
var CONTACT_CREAT_URL = IP + '/bpm/task/saveWorkMenu.do';
exports.CONTACT_CREAT_URL = CONTACT_CREAT_URL;
{ /*  工作联系单 跟进  */ }
var CONTACT_FOLLOW_URL = IP + '/bpm/task/saveFollow.do';
exports.CONTACT_FOLLOW_URL = CONTACT_FOLLOW_URL;
{ /*  工作联系单 汇报  */ }
var CONTACT_REPORT_URL = IP + '/bpm/task/saveReport.do';
exports.CONTACT_REPORT_URL = CONTACT_REPORT_URL;
