
export const API_ENDPOINTS = {
    USER: {
      GET_ALL: '/api/UserManage/getalluser',
      CREATE: '/api/UserManage/adduser',
      UPDATE: '/api/UserManage/updateuser',
      DELETE: '/api/UserManage/deleteuser',
    },
    Role: {
      GET_ALL: '/api/UserManage/getallrole',
      CREATE: '/api/UserManage/addrole',
      UPDATE: '/api/UserManage/updaterole',
      DELETE: '/api/UserManage/deleterole',
    },
    Status: {
      GET_ALL: '/api/UserManage/getallstatus',
      CREATE: '/api/UserManage/addstatus',
      UPDATE: '/api/UserManage/updatestatus',
      DELETE: '/api/UserManage/deletestatus',

    },

    Login:{
      LOGIN:'/api/UserManage/login',
      REGISTER:'/api/UserManage/register',
    }
    
  };