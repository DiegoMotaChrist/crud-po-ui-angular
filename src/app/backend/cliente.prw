WSMETHOD PUT WSSERVICE mobExpedicaoPedido

    Local oObj := Nil
    Local oUtil := Nil
    Local lRet := .T.

    Private cPedido := ::pedidoNumero
    Private cMsgErro := ""
    Private lBlqCrd := .F.
    Private lBlqEst := .F.

// Define o tipo de retorno do método
    ::setContentType("application/json")

    U_TOTVSES()

    oUtil := util():new()

    If FWJsonDeserialize(::getContent(), @oObj)

        SC5->(DbSetOrder(1))

        If SC5->(DbSeek(xFilial("SC5") + oObj:C5_NUM))

            RecLock("SC5", .f.)
            SC5->C5_YCODMOT := oObj:C5_YCODMOT
            SC5->C5_TRANSP := oObj:C5_TRANSP
            SC5->C5_VEICULO := oObj:C5_VEICULO
            SC5->(MsUnLock())

        EndIf

    Else
        setRestFault(500, EncodeUTF8("Erro ao montar Objeto JSON!"))
        lRet := .F.
    EndIf

    if oUtil <> nil
        oUtil:destroy()
    endIf

Return lRet