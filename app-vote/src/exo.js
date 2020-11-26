class ExoCDP {

    const EthDeposit = 2;
    const collatRate = 2;
    const collatMin = 1.5;
    const currentDebt = 100;
    let currentPriceETH = 100;

    getDepositAmount(EthDeposit,currentPriceETH){
        return  EthDeposit * currentPriceETH;
    }


    usdDeposit = getDepositAmount();

    currentCollatRate = usdDeposit * currentDebt;

    let currentPriceETH = 75;
    getLiquidationPrice(currentDebt, collatMin,currentCollatRate ){
        return ((currentDebt * collatMin)) / currentCollatRate;
    }


}