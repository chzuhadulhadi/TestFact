function ExamTable(data) {
    console.log(data)
    return (
        <>
            {Object.keys(data).map(function (key) {
                return (
                    <h1>
                        {key}
                        {Object.keys(data[key]).map(function (questionKey) {
                            return (<div><h2>
                                {questionKey}
                            </h2>
                                {Object.keys(data[key][questionKey]).map(function (questions) {
                                    return (
                                        <div>
                                            <h2>
                                                {questions}
                                            </h2>
                                        </div>
                                    )

                                })}
                            </div>
                            )
                        })}
                    </h1>)
            })
            }
        </>
    )
}
export default ExamTable