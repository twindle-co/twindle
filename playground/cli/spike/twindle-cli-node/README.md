Simple nodejs CLI application following the format from issue #288.

# Options:  
Options:  

--version: Show version number  

-o, --option: twindle command line options, choices ['pdf', 'epub', 'mobi', 'md'] 

-t, --thread-id: thread id of twitter thread that is to be converted  

-h, --help: Show help        

# Usage
`node twindle --thread-id <thread/conversation id> -o <file type>`

# Example:
`node twindle --thread-id 1279940000004973111 -o pdf`  
generates a pdf document from the text