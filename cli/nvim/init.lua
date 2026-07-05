-- bootstrap lazy.nvim
local lazypath = vim.fn.stdpath("data") .. "/lazy/lazy.nvim"
if not vim.loop.fs_stat(lazypath) then
  vim.fn.system({
    "git", "clone", "--filter=blob:none",
    "https://github.com/folke/lazy.nvim.git",
    "--branch=stable",
    lazypath,
  })
end
vim.opt.rtp:prepend(lazypath)

-- leader key (before lazy)
vim.g.mapleader = " "

-- options
vim.opt.number = true
vim.opt.cursorline = true
vim.opt.termguicolors = true
vim.opt.mouse = "a"
vim.opt.ignorecase = true
vim.opt.smartcase = true
vim.opt.hlsearch = true
vim.opt.incsearch = true
vim.opt.showmatch = true
vim.opt.expandtab = true
vim.opt.smarttab = true
vim.opt.shiftwidth = 2
vim.opt.tabstop = 2
vim.opt.autoindent = true
vim.opt.smartindent = true
vim.opt.wrap = true
vim.opt.encoding = "utf-8"
vim.opt.backspace = "indent,eol,start"
vim.opt.wildmenu = true
vim.opt.ruler = true
vim.opt.cmdheight = 2
vim.opt.laststatus = 2
vim.opt.autoread = true
vim.opt.background = "dark"
vim.opt.wildignore:append("*/tmp/*,*.so,*.swp,*.zip,*/node_modules,*/target,*/dist,*/build,*/coverage,.git,.hg,.svn,.idea")
vim.opt.list = true
vim.opt.listchars = { space = "·" }

-- strip trailing whitespace on save
vim.api.nvim_create_autocmd("BufWritePre", {
  pattern = "*",
  command = [[%s/\s\+$//e]],
})

-- filetype associations
vim.api.nvim_create_autocmd({ "BufNewFile", "BufRead" }, {
  pattern = { ".eslintrc", ".babelrc" },
  command = "set filetype=json",
})

-- keymaps
vim.keymap.set("n", "]", ":m +1<CR>", { silent = true })
vim.keymap.set("n", "[", ":m -2<CR>", { silent = true })

-- plugins
require("lazy").setup("plugins")
