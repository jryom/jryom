BEGIN       {p=1}
    /stars_begin/   {print;system("curl -s https://api.github.com/users/jryom/starred | jq -r '.[:15] | .[] | \"- [\" + (.full_name) + \"]\" + \"(\" + (.html_url) +  \"): <em>\" + (.description) + \"</em>\"'");p=0}
    /stars_end/     {p=1}
    /tracks_begin/   {print;system("node scripts/music.mjs tracks");p=0}
    /tracks_end/     {p=1}
    /artists_begin/   {print;system("node scripts/music.mjs artists");p=0}
    /artists_end/     {p=1}
    p
