BEGIN       {p=1}
    /stars_begin/   {print;system("curl -s https://api.github.com/users/jryom/starred | jq -r '.[] | \"- [\" + (.full_name) + \"]\" + \"(\" + (.html_url) +  \"): <em>\" + (.description) + \"</em>\"'");p=0}
    /stars_end/     {p=1}
    p
