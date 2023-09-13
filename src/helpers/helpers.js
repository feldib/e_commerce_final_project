const presentData = (dataLines, makeDataLines) => {
    if(dataLines.length > 0){
        return makeDataLines(dataLines)
    }
    else{
        return (
            <tr>
                <td colspan="8">
                    <h6 className='text-center'>No results</h6>
                </td>
            </tr>
        )
    }
}
export {presentData}