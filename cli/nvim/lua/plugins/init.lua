return {
  -- colorscheme
  {
    "sainnhe/edge",
    priority = 1000,
    config = function()
      vim.cmd.colorscheme("edge")
      vim.cmd("hi Normal guibg=NONE ctermbg=NONE")
      vim.cmd("hi CursorLine cterm=bold")
    end,
  },

  -- statusline
  {
    "nvim-lualine/lualine.nvim",
    dependencies = { "nvim-tree/nvim-web-devicons" },
    opts = {
      options = { theme = "auto" },
    },
  },

  -- file explorer
  {
    "nvim-tree/nvim-tree.lua",
    dependencies = { "nvim-tree/nvim-web-devicons" },
    keys = {
      { "<C-t>", "<cmd>NvimTreeToggle<cr>" },
      { "<leader>r", "<cmd>NvimTreeFindFile<cr>" },
    },
    opts = {
      respect_buf_cwd = true,
      filters = { custom = { "node_modules", ".git" } },
      renderer = { icons = { show = { git = true, file = true, folder = true } } },
    },
  },

  -- fuzzy finder (replaces ctrlp)
  {
    "nvim-telescope/telescope.nvim",
    dependencies = { "nvim-lua/plenary.nvim" },
    keys = {
      { "<C-p>", "<cmd>Telescope find_files<cr>" },
      { "<leader>fg", "<cmd>Telescope live_grep<cr>" },
      { "<leader>fb", "<cmd>Telescope buffers<cr>" },
    },
  },

  -- syntax highlighting
  {
    "nvim-treesitter/nvim-treesitter",
    branch = "master",
    build = ":TSUpdate",
    config = function()
      require("nvim-treesitter.configs").setup({
        ensure_installed = {
          "lua", "json", "yaml", "toml", "bash",
          "javascript", "typescript", "tsx",
          "go", "java", "kotlin",
          "html", "css", "markdown",
        },
        highlight = { enable = true },
        indent = { enable = true },
      })
    end,
  },

  -- lsp
  {
    "neovim/nvim-lspconfig",
    dependencies = {
      "williamboman/mason.nvim",
      "williamboman/mason-lspconfig.nvim",
    },
    config = function()
      require("mason").setup()
      require("mason-lspconfig").setup({
        automatic_installation = true,
      })
    end,
  },
}
