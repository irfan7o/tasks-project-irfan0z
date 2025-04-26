
const locales = ["en", "id", "zh"];

export const getLocale = () => {
  const pathname = new URL(window.location.href).pathname;
  const locale = locales.find((locale) =>
    pathname.startsWith(`/${locale}`)
  );
  return locale || "en";
};

export function useTranslation(locale: string) {
  const t = (key: string) => {
    // @ts-ignore
    return translations[locale][key] || key;
  };
  return { t };
}

export const translations = {
  en: {
    appTitle: "Tasks",
    addTask: "Add Task",
    editTask: "Edit Task",
    taskTitle: "Title",
    enterTaskTitle: "Enter task title",
    taskDescription: "Description",
    enterTaskDescription: "Enter task description",
    taskCategory: "Category",
    taskDueDate: "Due Date",
    taskImportant: "Mark as important",
    selectDueDate: "Select due date",
    save: "Save",
    cancel: "Cancel",
    delete: "Delete",
    noTasks: "No tasks yet. Add your first task!",
    taskDeleted: "Task deleted",
    settings: "Settings",
    themeLabel: "Theme",
    lightMode: "Light Mode",
    darkMode: "Dark Mode",
    languageLabel: "Language",
    english: "English",
    indonesian: "Indonesian",
    chinese: "Chinese",
    selectCategory: "Select a category",
    gym: "Gym",
    run: "Run",
    work: "Work",
    design: "Design",
    addCategory: "Add Category",
    addNewCategory: "Add New Category",
    categoryName: "Category Name",
    enterCategoryName: "Enter category name",
    add: "Add"
  },
  id: {
    appTitle: "Tugas",
    addTask: "Tambah Tugas",
    editTask: "Edit Tugas",
    taskTitle: "Judul",
    enterTaskTitle: "Masukkan judul tugas",
    taskDescription: "Deskripsi",
    enterTaskDescription: "Masukkan deskripsi tugas",
    taskCategory: "Kategori",
    taskDueDate: "Tenggat Waktu",
    taskImportant: "Tandai sebagai penting",
    selectDueDate: "Pilih tenggat waktu",
    save: "Simpan",
    cancel: "Batal",
    delete: "Hapus",
    noTasks: "Belum ada tugas. Tambahkan tugas pertama Anda!",
    taskDeleted: "Tugas dihapus",
    settings: "Pengaturan",
    themeLabel: "Tema",
    lightMode: "Mode Terang",
    darkMode: "Mode Gelap",
    languageLabel: "Bahasa",
    english: "Bahasa Inggris",
    indonesian: "Bahasa Indonesia",
    chinese: "Bahasa Mandarin",
    selectCategory: "Pilih kategori",
    gym: "Gym",
    run: "Lari",
    work: "Kerja",
    design: "Desain",
    addCategory: "Tambah Kategori",
    addNewCategory: "Tambah Kategori Baru",
    categoryName: "Nama Kategori",
    enterCategoryName: "Masukkan nama kategori",
    add: "Tambah"
  },
  zh: {
    appTitle: "任务",
    addTask: "添加任务",
    editTask: "编辑任务",
    taskTitle: "标题",
    enterTaskTitle: "输入任务标题",
    taskDescription: "描述",
    enterTaskDescription: "输入任务描述",
    taskCategory: "类别",
    taskDueDate: "截止日期",
    taskImportant: "标记为重要",
    selectDueDate: "选择截止日期",
    save: "保存",
    cancel: "取消",
    delete: "删除",
    noTasks: "还没有任务。添加您的第一个任务！",
    taskDeleted: "任务已删除",
    settings: "设置",
    themeLabel: "主题",
    lightMode: "亮色模式",
    darkMode: "暗色模式",
    languageLabel: "语言",
    english: "英语",
    indonesian: "印尼语",
    chinese: "中文",
    selectCategory: "选择类别",
    gym: "健身",
    run: "跑步",
    work: "工作",
    design: "设计",
    addCategory: "添加类别",
    addNewCategory: "添加新类别",
    categoryName: "类别名称",
    enterCategoryName: "输入类别名称",
    add: "添加"
  },
};
