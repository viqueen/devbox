#! /usr/bin/env ts-node

import simpleGit from "simple-git";
import { prompt } from "inquirer";

const listRecentBranches = async () => {
  return simpleGit().raw([
    "for-each-ref",
    "refs/heads/",
    "--sort=committerdate",
    `--format='%(committerdate:short) %(refname:short)'`,
  ]);
};

const switchBranchAnswer = async (answer: { branchDetails: string }) => {
  const matcher = answer.branchDetails.match(
    /'\d{4}-\d{2}-\d{2} (?<branchName>.*)'/
  );
  const branchName: string | undefined = matcher?.groups?.branchName;
  if (!branchName) {
    console.error("branch name selection missing");
    return;
  }
  return simpleGit().checkout(branchName);
};

const switchBranchQuestion = async (branches: string[]) => {
  return prompt([
    {
      name: "branchDetails",
      type: "list",
      message: "select recent branch to switch to",
      choices: branches,
      pageSize: 30,
    },
  ]);
};

listRecentBranches()
  .then((output: string) => output.trim().split("\n"))
  .then(switchBranchQuestion)
  .then(switchBranchAnswer);
