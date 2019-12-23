export default {
  data() {
    return {
      columns: [
        {
          type: 'selection',
          width: 60,
          align: 'center'
        },
        {
          title: '用户名',
          key: 'username',
          render: (h, params) => {
            return h('strong', params.row.username)
          }
        },
        { title: '部门', key: 'department' },
        { title: '注册时间', key: 'starttime', sortable: true, align: 'center' },
        {
          title: '用户状态',
          key: 'state',
          align: 'center',
          render: (h, params) => {
            let isUseState = params.row.state
            if (isUseState) {
              return h('span', { style: { color: 'green' } }, '可用')
            } else {
              return h('span', { style: { clolr: 'red' } }, '不可用')
            }
          }
        },
        { title: '地址', key: 'areaname' },
        {
          title: '操作',
          key: 'handle',
          width: 210,
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h(
                'Button',
                {
                  props: {
                    type: 'success',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.editUser(params.row)
                    }
                  }
                },
                '编辑'
              ),
              h(
                'Button',
                {
                  props: {
                    type: 'warning',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.changeUserPassword(params.row)
                    }
                  }
                },
                '修改密码'
              ),
              h(
                'Button',
                {
                  props: {
                    type: 'error',
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      this.removeUser([params.row.username])
                    }
                  }
                },
                '删除'
              )
            ])
          }
        }
      ]
    }
  }
}
