// 打印
export const log = (model, rows) => {
  console.group('表单属性');

  console.log('form属性', {
    rules: '表单验证规则',
    model: '表单数据源',
    rows: '表单项数据',
    width: '宽度',
    size: '大小',
    disabled: '是否禁用整个表单',
    loading: '表单loading',
    labelWidth: '标签的长度',
    labelPosition: '标签的长度，left 或 right',
    isValidate: '提交按钮是否表单验证',
    isDialog: '是否是弹窗内表单',
    isFooter: '是否隐藏脚部',
    '@submit': '提交事件，(values, instance, done)',
    '@close': '关闭弹窗事件',
  });

  console.log('item公共属性：', {
    formType: [
      'text',
      'button',
      'input',
      'input-number',
      'switch',
      'select',
      'cascader',
      'checkbox-group',
      'checkbox',
      'radio-group',
      'date',
      'time',
      'upload-img',
      'upload-imgs',
      'slot',
      'slotError',
    ],
    layout: {
      flex: '行内布局',
      cols: '多列布局',
      rows: '多行布局',
    },
    label: '标签文本',
    prop: 'model的键名， 它可以是一个路径数组',
    labelWidth: '标签宽度',
    required: '标签宽度',
    disabled: '是否禁用',
    isHide: '是否隐藏',
    rules:
      "表单验证规则，[{required: true, message: '', validator: () => {}, trigger: 'change、blur'}]",
    children: 'layout布局下的子item',
    optionList: "选项列表，[{ label: '选项', value: 0 }]",
    optionProps: '配置选项，具体配置项查看el组件',
    change: () => {},
    slot: '插槽，支持默认插槽和vnode（jsx语法）',
    slotError: '验证信息插槽，支持默认插槽和vnode（jsx语法）',
    tips: '提示或描述，支持默认插槽和vnode（jsx语法）',
  });

  // console.log('model');

  console.groupEnd();
};

// 校验数据源的数据类型
export const validatorType = (model, rows) => {
  let getValues = (prop) => {
    if (Array.isArray(prop)) {
      let i = 0;
      let fn = (event) => {
        if (event[prop[i]] == undefined) return console.log(`查找不到该属性`);
        if (prop.length - 1 == i) return event[prop[i]];
        i++;
        return fn(event[prop[i - 1]]);
      };
      return fn(model);
    } else {
      return model[prop];
    }
  };

  let queryFn = (queryData) => {
    for (let item of queryData) {
      // 值
      const value = getValues(item.prop);
      // 值类型
      const valueType = typeof value;
      // 表单类型
      const formType = item.formType;

      // 多列递归
      if (item.layout && item.layout == 'cols') {
        item.children.forEach((colsItem) => queryFn(colsItem));
      }

      // 多行递归
      if (item.layout && ['flex', 'rows'].includes(item.layout)) {
        queryFn(item.children);
      }
    }
  };

  queryFn(rows);
};
