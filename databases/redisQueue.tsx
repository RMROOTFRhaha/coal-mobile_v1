// Incomplete
export const RedisLPUSH = async () => { // parameters depend on how the change object is structed
    try  {
        await fetch('http://3.140.100.220:6379/', { //172.31.20.224:6379 <- other test
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              cmd: 'LPUSH',
              args: ['testList', 'a']
            }),
          });
    } catch (error) {
        console.error("There was an error: ", error);
    }
};