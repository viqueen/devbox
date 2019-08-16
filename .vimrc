set nocompatible              " be iMproved, required
filetype off                  " required

" set the runtime path to include Vundle and initialize
set rtp+=~/.vim/bundle/Vundle.vim
call vundle#begin()
" alternatively, pass a path where Vundle should install plugins
"call vundle#begin('~/some/path/here')

" let Vundle manage Vundle, required
Plugin 'VundleVim/Vundle.vim'
Plugin 'vim-airline/vim-airline'
Plugin 'vim-airline/vim-airline-themes'
Plugin 'scrooloose/nerdtree'
Plugin 'elzr/vim-json'
Plugin 'gkapfham/vim-vitamin-onec'
Plugin 'kien/ctrlp.vim'

" All of your Plugins must be added before the following line
call vundle#end()            " required
filetype plugin indent on    " required

set autoread

au BufNewFile,BufRead .eslintrc set filetype=json
au BufNewFile,BufRead .babelrc set filetype=json

autocmd BufWritePre * :%s/\s\+$//e

" Use full color in the terminal
set termguicolors

" Display the colorscheme
colorscheme vitaminonec

""" ui
syntax on
set wildmenu
set ruler
set mouse=a
set cmdheight=2
set number
set cursorline

hi CursorLine cterm=bold

""" search
set ignorecase
set smartcase
set hlsearch
set incsearch
set magic
set showmatch

""" text
set expandtab
set smarttab
set shiftwidth=2
set tabstop=2
set encoding=utf-8

set ai
set si
set wrap

set backspace=indent,eol,start

""" airline
set laststatus=2
let g:airline_theme='serene'
let g:airline_powerline_fonts = 1

""" ignore
set wildignore+=*/tmp/*,*.so,*.swp,*.zip,*/node_modules,*/target,*/dist,*/build,*/coverage,*/level_store*,.git,.hg,.svn,.idea

""" shortcuts
nmap ] :m +1<CR>
nmap [ :m -2<CR>

nmap <C-t> :NERDTree<CR>

let g:ctrlp_map = '<c-p>'
let g:ctrlp_cmd = 'CtrlP'

let g:NERDTreeRespectWildIgnore = 1
nmap <LEADER>r :NERDTreeFind<CR>

" NERDTress File highlighting

function! NERDTreeHighlightFile(extension, fg, bg, guifg, guibg)
  exec 'autocmd filetype nerdtree highlight ' . a:extension .' ctermbg='. a:bg .' ctermfg='. a:fg .' guibg='. a:guibg .' guifg='. a:guifg
  exec 'autocmd filetype nerdtree syn match ' . a:extension .' #^\s\+.*'. a:extension .'$#'
endfunction

call NERDTreeHighlightFile('jade', 'green', 'none', 'green', '#151515')
call NERDTreeHighlightFile('ini', 'yellow', 'none', 'yellow', '#151515')
call NERDTreeHighlightFile('md', 'blue', 'none', '#3366FF', '#151515')
call NERDTreeHighlightFile('yml', 'yellow', 'none', 'yellow', '#151515')
call NERDTreeHighlightFile('config', 'yellow', 'none', 'yellow', '#151515')
call NERDTreeHighlightFile('conf', 'yellow', 'none', 'yellow', '#151515')
call NERDTreeHighlightFile('json', 'yellow', 'none', 'yellow', '#151515')
call NERDTreeHighlightFile('html', 'yellow', 'none', 'yellow', '#151515')
call NERDTreeHighlightFile('styl', 'cyan', 'none', 'cyan', '#151515')
call NERDTreeHighlightFile('css', 'cyan', 'none', 'cyan', '#151515')
call NERDTreeHighlightFile('coffee', 'Red', 'none', 'red', '#151515')
call NERDTreeHighlightFile('js', 'Red', 'none', '#ffa500', '#151515')
call NERDTreeHighlightFile('php', 'Magenta', 'none', '#ff00ff', '#151515')

""" syntastic
let g:syntastic_auto_loc_list = 1
let g:syntastic_check_on_open = 1
let g:syntastic_check_on_wq = 0
