<template>
  <i-card class="standard-list" shadow>
    <i-list item-layout="vertical">
      <i-list-item v-for="item in data" :key="item.title">
        <i-list-item-meta
          :avatar="item.avatar"
          :title="item.title"
          :description="item.description"
        />
        {{ item.content }}
        <template slot="action">
          <li>
            <Icon type="ios-star-outline" />
            123
          </li>
          <li>
            <Icon type="ios-thumbs-up-outline" />
            234
          </li>
          <li>
            <Icon type="ios-chatbubbles-outline" />
            345
          </li>
        </template>
        <template slot="extra">
          <img
            src="https://dev-file.iviewui.com/5wxHCQMUyrauMCGSVEYVxHR5JmvS7DpH/large"
            style="width: 280px"
          />
        </template>
      </i-list-item>
    </i-list>
  </i-card>
</template>

<script>
export default {
  name: 'StandardList',

  components: {},

  filters: {},

  props: {},

  data() {
    return {
      data: [
        {
          title: 'This is title 1',
          description: 'This is description, this is description, this is description.',
          avatar: 'https://gw.alipayobjects.com/zos/rmsportal/sfjbOqnsXXJgNCjCzDBL.png',
          content:
            'This is the content, this is the content, this is the content, this is the content.'
        },
        {
          title: 'This is title 2',
          description: 'This is description, this is description, this is description.',
          avatar: 'https://gw.alipayobjects.com/zos/rmsportal/sfjbOqnsXXJgNCjCzDBL.png',
          content:
            'This is the content, this is the content, this is the content, this is the content.'
        },
        {
          title: 'This is title 3',
          description: 'This is description, this is description, this is description.',
          avatar: 'https://gw.alipayobjects.com/zos/rmsportal/sfjbOqnsXXJgNCjCzDBL.png',
          content:
            'This is the content, this is the content, this is the content, this is the content.'
        }
      ]
    }
  },

  computed: {},

  watch: {},

  created() {},

  mounted() {},

  updated() {},

  activated() {},

  deactivated() {},

  destroyed() {},

  methods: {}
}
</script>

<style></style>
