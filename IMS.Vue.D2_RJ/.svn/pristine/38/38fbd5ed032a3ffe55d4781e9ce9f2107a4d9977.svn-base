create table mes_commit_version(
  `id` number not null primary key,
  `title` varchar(255) not null default '' comment '标题',
  `sort_desc` varchar2(520) not null default '' comment '简评',
  `content` clob not null default '' comment '内容（富文本）',
  `tag` char(25) not null default '' comment '标签',
  `crated_time` char(25) not null default '' comment '创建时间',
  `updated_time` char(25) not null default '' comment '更新时间',
  `created_by` char(25) not null default '' comment '创建人',
  `updated_by` char(25) not null default '' comment '更新人',
  `status` number(1) not null default 1 comment '显示状态 1 表示显示 0 隐藏',
  `flag` number(1) not null default 1 comment '软删除标记 1 正常 0 已删除'
)comment '版本提交表';

create table mes_home_article(
  `id` number not null primary key,
  `type` number(1) not null default 0 comment '类型 0 默认值 1 通知公告 2 预警信息 3 待办事项',
  `target_type` number(1) not null default 0 comment '目标类型 0 默认值（默认是组织架构为单位目标） 1 个人',
  `target` varchar2(1024) not null default '' comment '目标 [1, 2, 3, 4, 5] 序列化 JSON 数据，查询的时候 where x in target',
  `title` varchar(255) not null default '' comment '标题',
  `sort_desc` varchar2(520) not null default '' comment '简评',
  `content` clob not null default '' comment '内容（富文本）',
  `tag` char(25) not null default '' comment '标签',
  `crated_time` char(25) not null default '' comment '创建时间',
  `updated_time` char(25) not null default '' comment '更新时间',
  `created_by` char(25) not null default '' comment '创建人',
  `updated_by` char(25) not null default '' comment '更新人',
  `is_top` number(1) not null default 0 comment '是否置顶 0 不置顶 1 置顶',
  `sort` number(10) not null default 0 comment '排序',
  `status` number(1) not null default 1 comment '显示状态 1 表示显示 0 隐藏',
  `flag` number(1) not null default 1 comment '软删除标记 1 正常 0 已删除'
)comment '文章表';

# order by is_top desc,sort desc,id desc

create table mes_home_memorandum(
  `id` number not null primary key,
  `uid` number not null default 0 comment '用户id',
  `tar_date` char(25) not null default '' comment '日期',
  `title` char(6) not null default '' comment '标题',
  `tag` varchar(60) not null default '' comment '标签'
  `remark` varchar(255) not null default '' comment '备注',
  `crated_time` char(25) not null default '' comment '创建时间',
  `created_by` char(25) not null default '' comment '创建人',
  `status` number(1) not null default 1 comment '显示状态 1 表示显示 0 隐藏',
  `flag` number(1) not null default 1 comment '软删除标记 1 正常 0 已删除'
)comment '备忘录表';

create table mes_common_functions
(
  id number not null primary key,
  uid number not null default 0 comment '用户id',
  menu_id number not null default 0 comment '菜单id',
  menu_path varchar(255) not null default '' comment '菜单路径',
  menu_title varchar(255) not null default '' comment '菜单中文名称',
  menu_en_title varchar(255) not null default '' comment '菜单英文名称',
  menu_icon varchar(60) not null default '' comment '菜单icon',
  num_of_click number not null default 0 comment '点击次数'
)comment '常用功能表';
# 说明：前端会传一个数组[{id, uid, menu_id, menu_path, menu_title, menu_en_title, menu_icon, num_of_click}, {id, uid, menu_id, menu_path, menu_title, menu_en_title, menu_icon, num_of_click}]
# 这样的一个数据结构给后端，后端拿到需要遍历传过来的参数，逐一对应更新，id为0则新增。
# 只要一个SaveData 和 LoadData 接口即可
# LoadData 接口不需要分页，只要返回该用户 num_of_click desc 排序的 limit (0, 8) 条记录即可 可以返回[]

