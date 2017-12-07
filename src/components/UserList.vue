<template>
  <div>
    <Table :columns="columns" :data="data"></Table>
  </div>
</template>
<script>
  import auth from '../api/auth'

  export default {
    data () {
      return {
        columns: [
          {
            title: 'username',
            key: 'username'
          },
          {
            title: 'password',
            key: 'password'
          },
          {
            title: 'create time',
            key: 'create_time'
          },
          {
            title: 'Action',
            key: 'action',
            width: 150,
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('button',
                  {
                    style: {
                      'background-color': '#fff',
                      'border': 0,
                      'cursor': 'pointer'
                    },
                    attrs: {
                      title: '删除'
                    },
                    on: {
                      click: () => {
                        this.deleteUser(params.row._id)
                      }
                    }
                  },
                  [
                    h('Icon', {
                      props: {
                        type: 'trash-a'
                      },
                      style: {
                        'font-size': '20px',
                        'color': '#647DDF'
                      }
                    })
                  ])
              ])
            }
          }
        ],
        data: []
      }
    },
    created () {
      this.getUserList()
    },
    methods: {
      getUserList () {
        auth.getUserList()
          .then((user) => {
            console.log(user)
            this.data = user
          })
          .catch((error) => {
            this.$Message.error(error.message)
          })
      },

      deleteUser (id) {
        const params = {
          id: id
        }
        auth.deleteUser(params)
          .then((user) => {
            console.log(user)
            if (user.code === 0) {
              this.getUserList()
            }
          })
          .catch((error) => {
            this.$Message.error(error.message)
          })
      }
    }
  }
</script>

<style>

</style>
