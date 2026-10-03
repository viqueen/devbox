" devbox vim config
set nocompatible

syntax on
filetype plugin indent on

set number
set cursorline
set mouse=a
set ignorecase
set smartcase
set hlsearch
set incsearch
set showmatch
set expandtab
set smarttab
set shiftwidth=2
set tabstop=2
set autoindent
set smartindent
set wrap
set encoding=utf-8
set backspace=indent,eol,start
set wildmenu
set ruler
set cmdheight=2
set laststatus=2
set autoread
set background=dark
set wildignore+=*/tmp/*,*.so,*.swp,*.zip,*/node_modules,*/target,*/dist,*/build,*/coverage,.git,.hg,.svn,.idea
set list
set listchars=space:·

if has('termguicolors')
  set termguicolors
endif

" strip trailing whitespace on save
autocmd BufWritePre * :%s/\s\+$//e

" filetype associations
autocmd BufNewFile,BufRead .eslintrc,.babelrc set filetype=json

" keymaps
nnoremap ] :m +1<CR>
nnoremap [ :m -2<CR>

silent! colorscheme retrobox
