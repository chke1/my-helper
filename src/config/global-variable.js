import { EnumArray } from '@/utils/enums.js';

export const RoleType = new EnumArray(
  { label: '创建者', value: 1 },
  { label: '超级管理员', value: 2 },
  { label: '普通管理员', value: 3 },
);
