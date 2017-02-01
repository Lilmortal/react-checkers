import { mapDispatchToProps } from '../components/tileContainer'

describe('Map dispatch to props', () => {
  it('should call startMoveDraught action', () => {
    let dispatchSpy

    beforeEach(() => {
      dispatchSpy = jest.fn()
    })

    const { moveDraughtClick } = mapDispatchToProps(dispatchSpy)
    moveDraughtClick()

    console.log(spyLastCall)
    //const expectedAction =
    const spyLastCall = dispatchSpy.args

    expect(spyLastCall.callAPI).to.be.ok
  })
})
