<template>
  <div class="brace-editor" :style="{ minHeight: '300px', minWidth: '400px', border: '1px solid #dcdee2' }"></div>
</template>

<script>
  /**
  * @desc 代码编辑器，基于ace.js封装
  * @example 调用示例
  *          <BraceEditor v-model="code" />
  **/
  import brace from 'brace';
  import 'brace/ext/language_tools';

  export default {
    name: 'BraceEditor',
    props: {
      value: {
        type: String,
        default: '',
      },
      lang: {
        type: String,
        required: true,
      },
      theme: {
        type: String,
        required: true,
      },
      disabled: {
        type: Boolean,
        default: false,
      },
    },
    data() {
      return {
        $brace: null,
      };
    },
    watch: {
      lang() {
        this.initAce();
      },
      theme() {
        this.initAce();
      },
      disabled(val) {
        this.$brace.setReadOnly(val);
      },
      value(val) {
        if (!this.$brace.isFocused()) {
          this.$brace.setValue(val);
        }
      },
    },
    mounted () {
      this.initAce();
    },
    methods: {
      initAce () {
        this.$brace = brace.edit(this.$el);
        let session = this.$brace.getSession();
        this.$emit('init', this.$brace);

        session.setMode(`ace/mode/${this.lang}`); // 配置语言
        this.$brace.setTheme(`ace/theme/${this.theme}`); // 配置主题
        this.$brace.setValue(this.value, 1); // 设置默认内容
        this.$brace.setReadOnly(this.disabled); // 设置是否为只读模式
        this.$brace.$blockScrolling = Infinity;

        // 代码提示与自动补全
        this.$brace.setOptions({
          enableBasicAutocompletion: true,
          enableLiveAutocompletion: true,
        });

        session.setTabSize(2); //Tab大小
        session.setUseSoftTabs(true);
        this.$brace.setShowPrintMargin(false); // 不显示打印边距
        session.setUseWrapMode(true); // 自动换行

        // 绑定事件回调
        const eventList = [
          { listen: 'change', emit: 'input' },
          'blur',
          'focus',
          'paste',
          'copy',
        ];
        eventList.forEach(event => {
          const listen = typeof event === 'string' ? event : event.listen;
          const emit = typeof event === 'string' ? event : event.emit;
          this.$brace.on(listen, ($editor, $fn) => {
            let content = this.$brace.getValue();
            this.$emit(emit, content, $editor, $fn);
          });
        });
      },
    },
  };
</script>
