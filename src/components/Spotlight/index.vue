<template>
  <transition name="h-spotlight-fade">
    <div class="h-spotlight" v-show="visible">
      <div class="h-spotlight-overlay" @click="close"></div>
      <transition name="h-spotlight-scale">
        <div class="h-spotlight-container" v-show="visible">
          <div class="h-spotlight-content">
            <div class="h-spotlight-search">
              <i class="h-icon h-icon-search"></i>
              <input
                ref="searchInput"
                v-model="searchQuery"
                :placeholder="placeholder"
                class="h-spotlight-input"
                @keydown.up.prevent="navigateUp"
                @keydown.down.prevent="navigateDown"
                @keydown.enter="handleEnter"
                @keydown.esc="close"
              />
            </div>
            <div class="h-spotlight-actions" v-if="filteredActions.length">
              <div
                v-for="(action, index) in filteredActions"
                :key="action.id"
                class="h-spotlight-action"
                :class="{ 'is-active': index === activeIndex }"
                @click="triggerActionByIndex(index)"
              >
                <div class="h-spotlight-action-icon" v-if="action.icon">
                  <i :class="action.icon"></i>
                </div>
                <div class="h-spotlight-action-content">
                  <div
                    class="h-spotlight-action-title"
                    v-html="highlightText(action.title, 'title', action)"
                  ></div>
                  <div
                    class="h-spotlight-action-description"
                    v-if="action.description"
                    v-html="highlightText(action.description, 'description', action)"
                  ></div>
                </div>
              </div>
            </div>
            <div v-else class="h-spotlight-empty">
              {{ emptyText }}
            </div>
          </div>
        </div>
      </transition>
    </div>
  </transition>
</template>

<script>
import Fuse from 'fuse.js';

export default {
  name: 'HSpotlight',

  props: {
    actions: {
      type: Array,
      default: () => []
    },
    placeholder: {
      type: String,
      default: '搜索...'
    },
    emptyText: {
      type: String,
      default: '未找到结果'
    },
  },

  data() {
    return {
      visible: false,
      searchQuery: '',
      activeIndex: 0,
      fuse: null
    }
  },

  computed: {
    filteredActions() {
      if (!this.searchQuery.trim()) {
        return this.actions;
      }

      const query = this.searchQuery.trim();

      // 根据搜索词类型选择不同的 Fuse 实例
      const fuse = this.hasChinese(query)
        ? this.fuseForChinese
        : this.fuseForEnglish;

      const results = fuse.search(query);

      // 对于英文搜索，过滤掉单字母匹配
      if (this.isEnglish(query)) {
        results.forEach(result => {
          result.matches = result.matches.map(match => {
            // 过滤掉长度为1的英文字母匹配
            match.indices = match.indices.filter(([start, end]) => {
              const matchText = result.item[match.key].slice(start, end + 1);
              return !this.isEnglish(matchText) || matchText.length > 1;
            });
            return match;
          }).filter(match => match.indices.length > 0);
        });
      }

      return results.map(result => ({
        ...result.item,
        matches: result.matches
      }));
    }
  },

  watch: {
    // 当 actions 改变时重新初始化 Fuse
    actions: {
      handler: 'initFuse',
      deep: true
    }
  },

  created() {
    // 初始化 Fuse 实例
    this.initFuse();
  },

  mounted() {
    window.addEventListener('keydown', this.handleShortcut)
  },

  beforeDestroy() {
    window.removeEventListener('keydown', this.handleShortcut)
  },

  methods: {
    initFuse() {
      const baseOptions = {
        keys: ['title', 'description'],
        includeMatches: true,
        findAllMatches: true,
        ignoreLocation: true,
        useExtendedSearch: true,
        isCaseSensitive: false
      };

      // 创建两个 Fuse 实例，使用不同的配置
      this.fuseForChinese = new Fuse(this.actions, {
        ...baseOptions,
        threshold: 0.6,
        minMatchCharLength: 1
      });

      this.fuseForEnglish = new Fuse(this.actions, {
        ...baseOptions,
        threshold: 0.2, // 更严格的匹配阈值
        minMatchCharLength: 2, // 最小匹配长度为2
        tokenize: true,
        matchAllTokens: false
      });
    },

    // 判断是否包含中文字符
    hasChinese(str) {
      return /[\u4e00-\u9fa5]/.test(str);
    },

    // 判断是否全是英文字符
    isEnglish(str) {
      return /^[a-zA-Z\s]+$/.test(str);
    },

    handleEnter(e) {
      // 如果是在输入法编辑状态，不触发动作
      if (e.isComposing) return;

      this.triggerAction();
    },

    handleShortcut(e) {
      // Ctrl/Cmd + K
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault()
        this.open()
      }
    },

    open() {
      this.visible = true
      this.searchQuery = ''
      this.activeIndex = 0
      this.$nextTick(() => {
        this.$refs.searchInput.focus()
      })
    },

    close() {
      this.visible = false
    },

    navigateUp() {
      if (this.activeIndex > 0) {
        this.activeIndex--
      } else {
        this.activeIndex = this.filteredActions.length - 1
      }
    },

    navigateDown() {
      if (this.activeIndex < this.filteredActions.length - 1) {
        this.activeIndex++
      } else {
        this.activeIndex = 0
      }
    },

    triggerAction() {
      const action = this.filteredActions[this.activeIndex]
      if (action && action.onTrigger) {
        action.onTrigger()
        this.close()
      }
    },

    triggerActionByIndex(index) {
      this.activeIndex = index
      this.triggerAction()
    },

    highlightText(text, fieldName, action) {
      if (!this.searchQuery || !text) return text;

      if (!action?.matches) return text;

      // 找到当前字段的匹配信息
      const fieldMatches = action.matches.filter(m => m.key === fieldName);
      if (!fieldMatches.length) return text;

      // 创建所有需要高亮的区间
      const highlights = fieldMatches.reduce((acc, match) => {
        return [...acc, ...match.indices];
      }, []);

      // 合并重叠的区间
      const mergedHighlights = this.mergeRanges(highlights);

      // 从后向前替换，避免位置偏移
      let result = text;
      for (let i = mergedHighlights.length - 1; i >= 0; i--) {
        const [start, end] = mergedHighlights[i];
        const before = result.substring(0, start);
        const match = result.substring(start, end + 1);
        const after = result.substring(end + 1);
        result = before + `<span class="h-spotlight-highlight">${match}</span>` + after;
      }

      return result;
    },

    // 合并重叠的区间
    mergeRanges(ranges) {
      if (!ranges.length) return [];

      // 先排序
      const sortedRanges = [...ranges].sort((a, b) => a[0] - b[0]);

      const merged = [sortedRanges[0]];

      for (let i = 1; i < sortedRanges.length; i++) {
        const current = sortedRanges[i];
        const last = merged[merged.length - 1];

        // 如果当前区间与上一个区间重叠，则合并
        if (current[0] <= last[1] + 1) {
          last[1] = Math.max(last[1], current[1]);
        } else {
          merged.push(current);
        }
      }

      return merged;
    }
  }
}
</script>
