import base64
import ipaddress
import json
import os
import aiohttp


class VirusTotal:
    """Class to manage the api of virus total"""
    BASE_API_URL = 'https://www.virustotal.com/api/v3'
    HEADERS = {'x-apikey': os.getenv('API_KEY')}

    @classmethod
    async def _make_request(cls, path, target):
        async with aiohttp.ClientSession() as session:
            async with session.get(f'{cls.BASE_API_URL}/{path}/{target}', headers=cls.HEADERS) as response:

                if response.ok:
                    return json.loads(await response.content.read())
                raise ConnectionError

    @staticmethod
    def _analyze_response(data):
        out = data['data']['attributes']['last_analysis_stats']
        return out

    async def get_ip_data(self, ip: str):
        data = await self._make_request('ip_addresses', ip)
        return self._analyze_response(data)

    async def get_url_data(self, url: str):
        encoded_url = base64.urlsafe_b64encode(url.encode()).decode().strip("=")
        data = await self._make_request('urls', encoded_url)
        return self._analyze_response(data)


async def check_on_virustotal(target: str) -> dict:
    """
    :param target: a string of what you have to analyze
    :return: {
        "harmless": 11,
        "malicious": 1,
        "suspicious": 0,
        "timeout": 0,
        "undetected": 1
    }
    """

    vt = VirusTotal()
    try:
        ip = ipaddress.ip_address(target)
        return await vt.get_ip_data(ip)
    except ValueError:
        return await vt.get_url_data(target)


async def main():
    """main for debug purposes, remember to set the API_KEY environ variable"""
    print(await check_on_virustotal('1.1.1.1'))
    print(await check_on_virustotal('https://www.virustotal.com/api/v3'))


if __name__ == '__main__':
    import asyncio

    loop = asyncio.get_event_loop()
    loop.run_until_complete(main())
