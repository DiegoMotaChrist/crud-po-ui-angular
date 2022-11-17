#INCLUDE "TOTVS.CH"
#INCLUDE "RESTFUL.CH"
#INCLUDE "TOPCONN.CH"
#INCLUDE "FWMVCDEF.CH"

WSRESTFUL clientes DESCRIPTION "Serviço para Acessar os Clientes SA1"

    WSDATA Codigo AS STRING

    WSMETHOD GET Codigo DESCRIPTION "Retorna clientes" WSSYNTAX "/clientes"
    WSMETHOD POST DESCRIPTION "Incluir cliente" WSSYNTAX "/clientes"
    WSMETHOD PUT Codigo DESCRIPTION "Editar cliente" WSSYNTAX "/clientes"
    WSMETHOD DELETE Codigo DESCRIPTION "Excluir cliente" WSSYNTAX "/clientes"

END WSRESTFUL

WSMETHOD GET Codigo WSSERVICE clientes

    local lRet  := .T.
    Local cJson := ""
    Local cSql  := ""
    Local nCodigo := ""

    Local SA1 := ""

    DEFAULT ::Codigo := ""

    if len(::aURLParms) > 0
        nCodigo := ::aURLParms[1]

    else
        cJson := "["
        nCodigo := ''
    endif

    ::SetContentType("application/json")

    ConOut("FLUIG => Inicio GET_CLIENTES " + AllTrim(DtoC(Date())) + " " + AllTrim(Time()) + ".")

    SA1 := RetSqlName("SA1") + " SA1"
    cSql := "select * from " + SA1 + " where D_E_L_E_T_ = ''"

    if nCodigo <> ''
        cSql += " AND A1_COD = '"+ nCodigo +"' "
    ENDIF

    SA1->(DBCLOSEAREA())

    TCQUERY cSql new alias SA1


    While SA1->(!Eof())

        cJson += "{"
        cJson += '"id":' + ALLTRIM(SA1->A1_COD) +  ','
        cJson += '"cnpj":' + '"' + ALLTRIM(SA1->A1_CGC) + '"' +  ','
        cJson += '"nome":' + '"' + ALLTRIM(SA1->A1_NOME) + '"' + ','
        cJson += '"loja":' + '"' + ALLTRIM(SA1->A1_LOJA) + '"' + ','
        cJson += '"fantasia":' + '"' + ALLTRIM(SA1->A1_NREDUZ)  + '"' + ','
        cJson += '"cep":' + '"' + ALLTRIM(SA1->A1_CEP)  + '"' + ','
        cJson += '"endereco":' + '"' + ALLTRIM(SA1->A1_END) + '"' + ','
        cJson += '"tipo":' + '"' + ALLTRIM(SA1->A1_TIPO)  + '"' + ','
        cJson += '"estado":' + '"' + ALLTRIM(SA1->A1_EST)  +'"'  + ','
        cJson += '"municipio":' + '"' + ALLTRIM(SA1->A1_MUN) +'"'
        cJson += "}"
        SA1->(DbSkip())

        If SA1->(!Eof())
            cJson += ","
        EndIf
        cJson += ""

    EndDO

    SA1->(DBCLOSEAREA())

    ConOut(cSql)

    if len(::aURLParms) = 0
        cJson += "]"
    else
    endIf

    If !empty(cJson)
        ::setResponse(cJson)
    else
        setRestFault(500, ENCODEUTF8( "Nenhum registro encontrado" ))
    EndIf


Return lRet

WSMETHOD POST WSSERVICE clientes

    local lRet     := .T.
    Local oObj     := ""

    ::setContentType("application/json")

    ConOut("FLUIG => Inicio POST_CLIENTE " + AllTrim(DtoC(Date())) + " " + AllTrim(Time()) + ".")

    If FWJsonDeserialize(::getContent(), @oObj)

        RecLock("SA1", .T.)
        SA1->A1_COD := cValToChar(oObj:id)
        SA1->A1_CGC := cValToChar(oObj:cnpj)
        SA1->A1_NOME := oObj:nome
        SA1->A1_LOJA := substr(oObj:loja,1,2)
        SA1->A1_NREDUZ := oObj:nome_fantasia
        SA1->A1_CEP := oObj:cep
        SA1->A1_END := oObj:endereco
        SA1->A1_TIPO := oObj:tipo
        SA1->A1_EST := oObj:estado
        SA1->A1_MUN := oObj:municipio
        SA1->(MsUnLock())

    Else
        setRestFault(500, EncodeUTF8("Erro ao montar Objeto JSON!"))
        lRet := .F.
    EndIf

Return lRet


WSMETHOD PUT Codigo WSSERVICE clientes

    Local oObj := ""
    local lRet := .T.
    Local nCodigo := ::Codigo


    ConOut(::aURLParms[1])
    if len(::aURLParms) > 0
        nCodigo := ::aURLParms[1]
    else
        nCodigo := ''
    endif

    ::setContentType("application/json")

    ConOut("FLUIG => Inicio PUT_CLIENTE " + AllTrim(DtoC(Date())) + " " + AllTrim(Time()) + ".")


    If FWJsonDeserialize(::getContent(), @oObj)

        SA1->(DbSetOrder(1))

        If SA1->(DbSeek(xFilial("SA1") + cValToChar(nCodigo)))

            RecLock("SA1", .F.)
            ConOut(nCodigo)
            SA1->A1_COD := ::Codigo
            SA1->A1_CGC := cValToChar(oObj:cnpj)
            SA1->A1_NOME := oObj:nome
            SA1->A1_LOJA := substr(oObj:loja,1,2)
            SA1->A1_NREDUZ := oObj:nome_fantasia
            SA1->A1_CEP := oObj:cep
            SA1->A1_END := oObj:endereco
            SA1->A1_TIPO := oObj:tipo
            SA1->A1_EST := oObj:estado
            SA1->A1_MUN := oObj:municipio
            SA1->(MsUnLock())

        ENDIF
    Else
        ConOut( "Deu erro")
        setRestFault(500, EncodeUTF8("Erro ao montar Objeto JSON!"))
        lRet := .F.

    ENDIF

Return lRet


WSMETHOD DELETE Codigo WSSERVICE clientes

    local lRet := .T.

    Local nCodigo := ::Codigo


    ConOut(::aURLParms[1])

    if len(::aURLParms) > 0
        nCodigo := ::aURLParms[1]
    else
        nCodigo := ''
    endif

    ::setContentType("application/json")

    ConOut("FLUIG => Inicio DELETE_CLIENTE " + AllTrim(DtoC(Date())) + " " + AllTrim(Time()) + ".")

    SA1->(DbSetOrder(1))

    If SA1->(DbSeek(xFilial("SA1") + cValToChar(nCodigo)))

        RecLock("SA1", .F.)
        SA1->(DbDelete())
        SA1->(MsUnLock())

    EndIf

Return lRet